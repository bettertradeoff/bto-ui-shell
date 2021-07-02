import express from 'express'
import proxy from 'http-proxy'

export default (app: express.Express, proxy: proxy) => {
  app.get('/carts/*', function(req: express.Request, res: express.Response) {
    req.url = req.url.replace('/carts', '')
    proxy.web(req, res, { target: 'http://localhost:3010', changeOrigin: true })
  })
}