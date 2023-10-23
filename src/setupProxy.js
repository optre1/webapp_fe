// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001', //change this with your public ip if you want it to be accessed by other devices
      changeOrigin: true,
    })
  )
};
