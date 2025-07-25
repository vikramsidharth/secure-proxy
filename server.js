const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Proxy target (original backend)
const target = 'http://atmsmobileapi.neemus.com';

app.use(
  '/api',
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '/api',
    },
    // Remove this — causes body loss on some platforms
    // onProxyReq manually rewriting body can break things
  })
);

// Optional: health check
app.get('/', (req, res) => {
  res.send('✅ Proxy is running.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server listening on port ${PORT}`);
});
