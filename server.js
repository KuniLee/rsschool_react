import fs from 'node:fs/promises'
import express from 'express'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite

if (!isProduction) {
  const { createServer } = await import('vite')

  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default

  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    let template
    let render
    let parts

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml

      render = (await import('./dist/server/entry-server.js')).render
    }
    parts = template.split('<!--app-html-->')

    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')
    res.write(parts[0])

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const stream = render(url, {
      onShellReady() {
        stream.pipe(res)
      },
      onAllReady() {
        res.end(parts[1])
      },
      onError(err) {
        console.error(err)
      },
    })
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
