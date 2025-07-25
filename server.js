const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 🔓 Enable CORS for all requests
app.use(cors());

// 🧠 Body parser for JSON payloads
app.use(express.json());  // <-- 🔥 This is critical

// 📦 Proxy setup
const target = 'http://atmsmobileapi.neemus.com';
app.use(
  '/api',
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '/api',
    },
    onProxyReq: (proxyReq, req, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        // Set proper headers and send body
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
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
