import express from 'express'
import proxy from 'http-proxy'

export default (app: express.Express, proxy: proxy) => {
  app.get('/products/*', function(req: express.Request, res: express.Response) {
    req.url = req.url.replace('/products', '')
    proxy.web(req, res, { target: 'http://localhost:3011', changeOrigin: true })
  })
}