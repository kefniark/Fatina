const replace = require('replace-in-file')
const pack = require('../package.json')

;(async () => {
  await replace({
    files: ['dist/fatina.cjs.js', 'dist/fatina.esm.js'],
    from: /\[AIV\]{version}\[\/AIV\]/g,
    to: pack.version
  })
})()
