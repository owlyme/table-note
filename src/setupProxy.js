const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://106.13.49.30:3001",
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
