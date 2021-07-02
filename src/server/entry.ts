import express from 'express'
import { minify } from 'html-minifier'

export interface Config {
  title?: string
  esModuleShims?: string
  entryFile?: string
  imports?: { [key: string]: string }
  minify?: boolean
}

export default (app: express.Express) => {
  app.get('*', async function(req: express.Request, res: express.Response) {
    const config: Config = await import('./config.json').then(c => c.default)
    const imports = JSON.stringify({ 'imports': config.imports || {} }, null, config.minify ? 0: 2)

    const minifyTemplate = (template: string) => 
      minify(template, { collapseWhitespace: true, minifyCSS: true, minifyJS: true })

    const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <base href="/" />
        <title>${config.title}</title>
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: sans-serif;
          }
        </style>   
        <script>
          globalThis['stores'] = new Map()
        </script>
        ${ config.esModuleShims ? `<script defer src="${config.esModuleShims}"></script>`: '' }
        ${ config.imports ? `<script type="importmap${config.esModuleShims ? '-shim': ''}">${ imports }</script>` : '' }
      </head>
      <body>
        <div id="app"></div>
        <script type="module${config.esModuleShims ? '-shim': ''}" src="${config.entryFile}"></script>
      </body>
      </html>
    `

    return res.end(config.minify ? minifyTemplate(template): template )
  })
}