const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Backend base URL without trailing slash
const target = 'http://atmsmobileapi.neemus.com';

app.use(
  '/api',
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    secure: false, // allow http (non-SSL) backend
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTPS proxy running on port ${PORT}`);
});
