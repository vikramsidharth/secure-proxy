const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 🔓 Enable CORS for all requests
app.use(cors());

// 📦 Proxy setup
const target = 'http://atmsmobileapi.neemus.com';
app.use(
  '/api',
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '/api'  // optional, but keeps /api in path
    },
  })
);

// 🩺 Health check route
app.get('/', (req, res) => {
  res.send('✅ Proxy is live and working!');
});

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🛡️ HTTPS proxy running on port ${PORT}`);
});
