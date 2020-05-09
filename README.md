# jsmaker

Make JavaScript modules from text and binary files. Export a file content in plain text, base64 or Uint8Array. Save as CommonJS, ESM or UMD. Load as a normal JS module. Bundle

### Install
```
npm install jsmaker --global
```

### CLI
```
jsmaker example.txt -m umd -t text -o example.js
```

Arguments:
- `-t`, `--type` - type of exported data (`text` *default*, `uint8`, `base64`)
- `-m`, `--module` - module format (`cjs` *default*, `esm`, `umd`)
- `-o`, `--output` - output file name

Using `stdin` and `stdout`:
```
cat example.wasm | jsmaker -m cjs -t uint8 > example.js
```

### API
```javascript
const jsmaker = require('jsmaker')
const fs = require('fs')
const file = fs.readFileSync('./example.txt')
const res = jsmaker(file, { module: 'cjs', type: 'text' })
fs.writeFileSync('./example.js', res)
```

### Motivation
Publishing JS packages that include non-js files is hard. Loading them is even harder. Wrapping files in JavaScript modules simplifies that process

### But it's not async!
Yes, and you should probably use async `fetch` in 99% cases. Especially when developing for browsers and a file size is large

### Alternatives
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [exportify](https://www.npmjs.com/package/exportify)
- [wasm2js](https://www.npmjs.com/package/wasm2js)
