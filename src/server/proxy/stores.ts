import express from 'express'
import proxy from 'http-proxy'

export default (app: express.Express, proxy: proxy) => {
  app.get('/www/*', function(req: express.Request, res: express.Response) {
    req.url = req.url.replace('/www', '')
    proxy.web(req, res, { target: 'http://localhost:3012', changeOrigin: true })
  })
}