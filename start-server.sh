#!/bin/bash

# Start local HTTP server for the website
# This script works on macOS and Linux

echo "============================================================"
echo "Starting Local Web Server..."
echo "============================================================"

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to that directory
cd "$SCRIPT_DIR"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo ""
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 server.py
elif command -v python &> /dev/null; then
    echo ""
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python server.py
elif command -v node &> /dev/null; then
    echo ""
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    node server.js
else
    echo "Error: Neither Python nor Node.js is installed"
    echo "Please install Python 3 or Node.js"
    exit 1
fi
