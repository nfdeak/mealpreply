import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rawBase = process.env.VITE_BASE_PATH || '/'
const normalizedBase = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`
const pathSegmentsToKeep = normalizedBase === '/' ? 0 : normalizedBase.split('/').filter(Boolean).length

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // SPA redirect compatible with GitHub Pages subpaths.
      var pathSegmentsToKeep = ${pathSegmentsToKeep};
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    Redirecting...
  </body>
</html>
`

const distDir = path.resolve('dist')
await mkdir(distDir, { recursive: true })
await writeFile(path.join(distDir, '404.html'), html)
