// const fs = require('fs')
// const data = fs.readFileSync('./package.json')
// console.log(data.toString()); //这是一个buffer对象 输出的是一个二进制码 toString之后会转换成文本

// fs.readFile('./package.json', (err, data) => {
//   console.log(data)
// })

// 我们也可以直接使用util的promisify

// const fs = require('fs')
// const { promisify } = require('util')
// const readFile = promisify(fs.readFile)
// readFile('./package.json').then(data => {
//   console.log(data.toString())
// })

// 使用async awit
;(async () => {
  const fs = require('fs')
  const { promisify } = require('util')
  const readFile = promisify(fs.readFile)
  const data = await readFile('./package.json')
  console.log(data)
})()
