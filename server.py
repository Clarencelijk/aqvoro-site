#!/usr/bin/env python3
"""
Simple HTTP Server for serving the procurement agency website locally.
Run this script from the directory containing index.html
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers to prevent caching issues
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    """Start the HTTP server"""
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"=" * 60)
        print(f"🚀 Server is running!")
        print(f"=" * 60)
        print(f"📍 Open your browser and go to:")
        print(f"   👉 http://localhost:{PORT}")
        print(f"   👉 http://127.0.0.1:{PORT}")
        print(f"=" * 60)
        print(f"📁 Serving files from: {DIRECTORY}")
        print(f"=" * 60)
        print(f"Press Ctrl+C to stop the server")
        print(f"=" * 60)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
