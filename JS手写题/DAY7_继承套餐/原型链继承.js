function Person() {
  this.name = "juege"
}

Person.prototype.eating = function () {
  console.log("eating")
}

function Student() {}
Student.prototype = new Person()

// 前端实现类的过程中都没有传递参数。
// 多个实例对引用类型的操作会被篡改。
// 打印子类实例，子类继承到的属性是永远看不见的。