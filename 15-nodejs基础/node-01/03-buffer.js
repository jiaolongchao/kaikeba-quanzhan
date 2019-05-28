const buf1 = Buffer.alloc(10) //分配一个内存空间 是对c语言的一个浅层的封装 提取一个二进制函数
console.log(buf1);

const buf2 = Buffer.from([1,2,3])  //直接进行二制赋值  //<Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf2);  //<Buffer 01 02 03>

const buf3 = Buffer.from('Buffer创建方法')
console.log(buf3.toString());  

buf1.write('hello')
console.log(buf1.toString());

const buf4 = Buffer.concat([buf1,buf3])
console.log(buf4.toString());

//buffer主要用来处理二进制数据 




