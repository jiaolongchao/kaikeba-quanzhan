var util = require('util')
function Base () {
  this.name = 'base'
  this.base = 1991
  this.sayHello = function () {
    console.log('hello' + this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}

function Sub () {
  this.name = 'sub'
}

util.inherits(Sub, Base)

var base = new Base()
var sub = new Sub()

base.sayHello()
base.showName()

sub.showName()
//sub.sayHello()

