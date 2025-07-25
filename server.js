const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS and JSON
app.use(cors());
app.use(express.json());

// Define target backend
const target = 'http://atmsmobileapi.neemus.com';

// Proxy config
app.use('/api', createProxyMiddleware({
  target: target,
  changeOrigin: true,
  secure: false, // allow HTTP
  pathRewrite: {
    '^/api': '/api',
  }
}));

// Health check
app.get('/', (req, res) => {
  res.send('✅ Proxy is up!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ HTTPS Proxy running on port ${PORT}`);
});
