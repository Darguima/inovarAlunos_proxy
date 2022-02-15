import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import modifyResponse from 'node-http-proxy-json'

import fs from 'fs'
import https from 'https'

import { inovarApiResponse } from './types/inovarApiResponse'

const key = fs.readFileSync('cert/CA/server/server.decrypted.key')
const cert = fs.readFileSync('cert/CA/server/server.crt')

const app = express()

app.use(
  '/',
  createProxyMiddleware(
    {
      target: 'https://193.236.33.154',
      headers: { Host: 'alunos.aecarlosamarante.pt' },
      changeOrigin: true,

      onProxyRes: (proxyRes, req, res) => {
        console.log('proxy requested')

        switch (req.url) {
          case '/api/faltas/44849/1':
            modifyResponse(res, proxyRes.headers['content-encoding'], (body: inovarApiResponse.faltas) => {
              if (body) {
                body.Faltas = [body.Faltas[1]]
              }
              return body
            })
            break
        }
      }
    }
  )
)

const server = https.createServer({ key, cert }, app)
server.listen(443)
