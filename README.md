# Node.js Port Already in Use Error

This repository demonstrates a common Node.js error: failing to start an HTTP server because the specified port is already in use.  The `bug.js` file contains the erroneous code, while `bugSolution.js` provides a robust solution.

## Problem

Attempting to start a Node.js HTTP server on a port that's already occupied by another process results in an error. This often happens during local development when multiple applications try to use the same port simultaneously.

## Solution

The solution involves checking if the port is available before starting the server.  We utilize the `isPortTaken` function (shown in `bugSolution.js`) to achieve this, implementing a retry mechanism with exponential backoff to gracefully handle port contention.