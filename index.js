const defaults = {
  module: 'cjs',
  type: 'base64'
}

module.exports = function jsmaker (buf, opts) {
  const options = Object.assign({}, defaults, opts)
  const content = options.type === 'text' ? JSON.stringify(buf.toString()) : buf.toString('base64')

  let res = ''

  // Write util functions
  if (options.type === 'uint8') {
    res +=
`function toUint8Array (s) {
  if (typeof atob === 'function') return new Uint8Array(atob(s).split('').map(charCodeAt))
  return (require('buf' + 'fer').Buffer).from(s, 'base64')
}
function charCodeAt (c) {
  return c.charCodeAt(0)
}`
  }

  // Write content in selected module format
  if (options.module === 'esm') {
    res += `export default ${options.type === 'uint8' ? `toUint8Array('${content}')` : `'${content}'`}`
  } else if (options.module === 'cjs') {
    res += `module.exports = ${options.type === 'uint8' ? `toUint8Array('${content}')` : `'${content}'`}`
  } else {
    res +=
`(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return ${options.type === 'uint8' ? `toUint8Array('${content}')` : `'${content}'`}
}));`
  }
  return res
}
