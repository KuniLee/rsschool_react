import fs from 'node:fs/promises'
import express from 'express'
import { ViteDevServer } from 'vite'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite: ViteDevServer

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

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render = (await import('./dist/server/entry-server.js')).render
    }
    const parts = template.split('<!--app-html-->')

    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')
    res.write(parts[0])

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const { pipe, store } = await render(url, {
      onShellReady() {
        pipe.pipe(res)
      },
      onAllReady() {
        const preloadedState = store.getState()

        // parts[1] = parts[1].replace(
        //   `<!--preloaded-state-->`,
        //   `<script>
        //    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        // </script>`
        // )
        res.end(parts[1])
      },
      onError(err: Error) {
        console.error(err)
      },
    })
  } catch (e) {
    if (!(e instanceof Error)) return
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})