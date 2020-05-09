#!/usr/bin/env node
const jsmaker = require('../')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    module: 'm',
    type: 't',
    output: 'o'
  },
  default: {
    module: 'cjs',
    type: 'base64'
  }
})

// Read
let input
if (argv._.length === 1) {
  const inputFile = argv._[0]
  input = fs.readFileSync(inputFile)
} else {
  input = fs.readFileSync(0)
}

const output = jsmaker(input, {
  module: argv.module,
  type: argv.type
})

// Write
if (argv.output && argv.output.length) {
  fs.writeFileSync(argv.output, output)
} else {
  process.stdout.write(output)
}
