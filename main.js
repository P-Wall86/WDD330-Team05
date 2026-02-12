import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Log startup info
console.log(`Starting server...`);
console.log(`Script location: ${__filename}`);
console.log(`Script directory: ${__dirname}`);
console.log(`Looking for dist at: ${distPath}`);
console.log(`Dist exists: ${fs.existsSync(distPath)}`);

// Serve static files from the dist directory
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: false
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback - serve index.html for all non-file routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error(`ERROR: index.html not found at ${indexPath}`);
    let message = `<h1>Build Error</h1>`;
    message += `<p>index.html not found. Dist path: ${distPath}</p>`;
    message += `<p>Dist exists: ${fs.existsSync(distPath)}</p>`;
    if (fs.existsSync(distPath)) {
      message += `<p>Contents: ${fs.readdirSync(distPath).join(', ')}</p>`;
    }
    return res.status(500).send(message);
  }
  
  res.sendFile(indexPath);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Serving files from: ${distPath}`);
  console.log(`✓ NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

