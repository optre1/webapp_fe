// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://188.25.153.149:5001',
      changeOrigin: true,
    })
  )
  /*app.use(
    '/api/tasks/*',
    createProxyMiddleware({
      target: 'http://188.25.153.149:5001',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/deals/*',
    createProxyMiddleware({
      target: 'http://188.25.153.149:5001',
      changeOrigin: true,
    })
  )*/
  /*app.use(
    '/api/loginWithCookie',
    createProxyMiddleware({
      target: 'http://192.168.1.218:5001',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/dashboard',
    createProxyMiddleware({
      target: 'http://192.168.1.218:5001',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/logout',
    createProxyMiddleware({
      target: 'http://192.168.1.218:5001',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/tasks/create',
    createProxyMiddleware({
      target: 'http://192.168.1.218:5001',
      changeOrigin: true,
    })
  )
  app.use(
    '/api/tasks/get',
    createProxyMiddleware({
      target: 'http://192.168.1.218:5001',
      changeOrigin: true,
    })
  )*/
};
