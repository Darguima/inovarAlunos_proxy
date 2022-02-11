import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import modifyResponse from 'node-http-proxy-json'

const app = express()

app.use(
  '/',
  createProxyMiddleware(
    {
      target: 'https://193.236.33.154',
      headers: { Host: 'alunos.aecarlosamarante.pt' },
      changeOrigin: true,
      onProxyRes
    }
  )
)

function onProxyRes (proxyRes, req, res) {
  console.log('proxy requested')
  if (req._parsedUrl.pathname == '/api/faltas/44849/1') {
    delete proxyRes.headers['content-length']

    modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
      if (body) {
        body.Faltas = [body.Faltas[1]]
      }
      return body
    })
  }
}

app.listen(80)
