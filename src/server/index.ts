import express from 'express'
import http from 'http'
import proxy from 'http-proxy'
import path from 'path'

import type { AddressInfo } from 'net'

import Products from './proxy/products'
import Carts from './proxy/carts'
import Stores from './proxy/stores'
import Entry from './entry'

const PORT = 5000
const HOST_NAME = 'localhost'

const app = express()
const apiProxy = proxy.createProxyServer()

app.use(express.static(path.resolve('../dist')))

Products(app, apiProxy)
Carts(app, apiProxy)
Stores(app, apiProxy)

Entry(app)

const server = http.createServer(app)
server.listen(PORT, HOST_NAME)
  .on('listening', function() {
    const { port, address } = server.address() as AddressInfo;
    console.log(`Express server started on port ${port} at ${address}.`); 
  })
