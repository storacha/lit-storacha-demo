import { build } from 'esbuild'

build({
  entryPoints: ['./src/lit-actions/validate-decrypt-invocation.js'],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: './src/lit-actions/dist/validate-decrypt-invocation.js',
  sourceRoot: './',
  platform: 'browser',
  metafile: true
}).catch(err => {
  console.error(err)
  return process.exit(1)
})
