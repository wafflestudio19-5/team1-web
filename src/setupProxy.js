const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://waffleoverflow.shop",
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader("Origin");
      },
    })
  );
};
