#!/usr/bin/env node
/**
 * Simple HTTP Server for serving the procurement agency website locally.
 * Run: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const DIRECTORY = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Remove leading slash
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Construct the full file path
  const filePath = path.join(DIRECTORY, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(DIRECTORY)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // File not found, serve index.html for SPA routing
      const indexPath = path.join(DIRECTORY, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        });
        res.end(data);
      });
      return;
    }

    // If it's a directory, try to serve index.html
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        });
        res.end(data);
      });
      return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      // Determine MIME type
      const ext = path.extname(filePath).toLowerCase();
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

      // Set response headers
      const headers = {
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*',
      };

      // Add cache control headers
      if (['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'].includes(ext)) {
        headers['Cache-Control'] = 'public, max-age=31536000';
      } else {
        headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0';
      }

      res.writeHead(200, headers);
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Server is running!');
  console.log('='.repeat(60));
  console.log('📍 Open your browser and go to:');
  console.log(`   👉 http://localhost:${PORT}`);
  console.log(`   👉 http://127.0.0.1:${PORT}`);
  console.log('='.repeat(60));
  console.log(`📁 Serving files from: ${DIRECTORY}`);
  console.log('='.repeat(60));
  console.log('Press Ctrl+C to stop the server');
  console.log('='.repeat(60));
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`Try a different port or kill the process using port ${PORT}`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
