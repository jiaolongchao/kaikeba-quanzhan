const conf = require("./conf");
const EventEmitter = require("events").EventEmitter;
// 客户端
const MongoClient = require("mongodb").MongoClient;
class Mongodb {
  constructor(conf) {
    // 保存conf
    this.conf=conf;
    this.emmiter = new EventEmitter();
    // 连接
    this.client = new MongoClient(conf.url, { useNewUrlParser: true });  //useNewUrlParser防止兼容性的参数
    this.client.connect(err => {
      if (err) throw err;
      console.log("连接成功");
      this.emmiter.emit("connect");
    });
  }
  col(colName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }
  once(event, cb) {  //注册事件回调
    this.emmiter.once(event, cb);
  }
}

// 2.导出db
module.exports = new Mongodb(conf);