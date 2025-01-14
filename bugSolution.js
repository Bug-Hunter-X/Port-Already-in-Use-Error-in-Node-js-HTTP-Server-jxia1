const http = require('http');
const net = require('net');

function isPortTaken(port) {
  return new Promise((resolve) => {
    const tester = net.createServer().once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    }).once('listening', () => {
      tester.close();
      resolve(false);
    }).listen(port);
  });
}

async function startServer(port) {
  if (await isPortTaken(port)) {
    console.log(`Port ${port} is in use. Retrying...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    return startServer(port); // Retry
  } else {
    const requestListener = (request, response) => {
      response.writeHead(200);
      response.end('Hello, World!');
    };

    const server = http.createServer(requestListener);
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

const port = 8080;
startServer(port);