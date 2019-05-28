const mongoose = require("mongoose");

// 1.连接
mongoose.connect("mongodb://58.87.88.188:27017/test", { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));
conn.once("open", () => console.log("连接数据库成功"));