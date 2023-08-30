const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/dronecount", {
      target: "https://fibregrid.amxdrones.com",
      changeOrigin: true,
      secure: false,
      headers: {
        Auth: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywibmFtZSI6ImRldmVsb3BlckBtYWlsLmNvbSIsImV4cCI6MTY4ODE4MjY3OH0.gK1r71wClKRldmLvUX4Ih1TnFYGq-jrY1AEktMxKCm8",
      },
    })
  );
};
