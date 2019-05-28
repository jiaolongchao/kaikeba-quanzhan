;(async () => {
  const mysql = require('mysql2/promise') //返回的实例或方法 都是promise方法

  // 连接配置
  const cfg = {
    host: '58.87.88.188',
    user: 'root',
    password: '123456', // 修改为你的密码
    database: 'test' // 请确保数据库存在
  }

  const connection = await mysql.createConnection(cfg)
 // console.log('conn:', connection)
  let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS test (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `)
  //console.log('create', ret)

  ret = await connection.execute(
    `
            INSERT INTO test(message)
            VALUES(?)
    `,
    ['ABC']
  )
  //console.log('insert:', ret)

  ret = await connection.execute(`
            SELECT * FROM test
    `)
  console.log(JSON.stringify(ret[0]))
  // console.log(ret[1])

  connection.end()
})()
