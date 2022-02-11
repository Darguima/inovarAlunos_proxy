"use strict";

var _express = _interopRequireDefault(require("express"));

var _httpProxyMiddleware = require("http-proxy-middleware");

var _nodeHttpProxyJson = _interopRequireDefault(require("node-http-proxy-json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use('/', (0, _httpProxyMiddleware.createProxyMiddleware)({
  target: 'https://193.236.33.154',
  headers: {
    Host: 'alunos.aecarlosamarante.pt'
  },
  changeOrigin: true,
  onProxyRes: onProxyRes
}));

function onProxyRes(proxyRes, req, res) {
  console.log('proxy requested');

  if (req._parsedUrl.pathname == '/api/faltas/44849/1') {
    delete proxyRes.headers['content-length'];
    (0, _nodeHttpProxyJson["default"])(res, proxyRes.headers['content-encoding'], function (body) {
      if (body) {
        body.Faltas = [body.Faltas[1]];
      }

      return body;
    });
  }
}

app.listen(80);
