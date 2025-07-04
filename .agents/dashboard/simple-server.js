#!/usr/bin/env node

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// API endpoints
app.get('/api/status', async (req, res) => {
  try {
    const config = await fs.readFile(path.join(__dirname, '../config/gqcars-master-config.json'), 'utf8');
    res.json(JSON.parse(config));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🚗 GQ Cars Agent Dashboard</h1>
    <p>Dashboard running successfully!</p>
    <p><a href="/api/status">View Agent Status</a></p>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; background: #1e3c72; color: white; }
      h1 { color: #4CAF50; }
      a { color: #4CAF50; }
    </style>
  `);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🌐 GQ Cars Agent Dashboard running at http://localhost:${PORT}`);
});