/**
 * PulseRevOps AI - Backend Mock API & Telemetry Event Receiver
 * Run with: node server.js
 */

import http from 'node:http';

const PORT = process.env.PORT || 4001;

const mockAccounts = [
  {
    id: 'acc-101',
    name: 'Acme Global Networks',
    arr: 650000,
    healthScore: 38,
    riskCategory: 'CRITICAL',
    aiSummary: 'Executive Champion Departed + 42% Seat Utilization Drop.',
  },
  {
    id: 'acc-102',
    name: 'Datadock Technologies',
    arr: 420000,
    healthScore: 48,
    riskCategory: 'CRITICAL',
    aiSummary: 'Competitor POC detected in telemetry + CSV export spike.',
  },
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'HEALTHY', service: 'PulseRevOps Telemetry API', timestamp: new Date() }));
    return;
  }

  if (req.url === '/api/accounts' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: mockAccounts.length, data: mockAccounts }));
    return;
  }

  if (req.url === '/api/ai/diagnose' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        model: 'gemini-1.5-pro',
        synthesis: 'AI Diagnostic Completed: Priority action assigned to CSM Executive Sponsor Outreach.',
        estimatedArrSaved: 450000,
      }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`[PulseRevOps API Server] Listening on http://localhost:${PORT}`);
});
