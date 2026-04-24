function Person(name) {
  this.name = name
  this.hobbies = ['eat', 'sleep']
}

function Student(name, number) {
  Person.call(this, name) // 借用构造函数
  this.number = number
}

const s1 = new Student('Tom', 1001)
const s2 = new Student('Jerry', 1002)

// 拿不到父类原型上的方法
//没有继承原型链，原型链直接断裂
