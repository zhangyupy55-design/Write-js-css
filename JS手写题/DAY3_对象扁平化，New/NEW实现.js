function myNew(fn, ...args) {
  if(Object.prototype.toString.call(fn) !== "[object Function]") {
    return "Error in params"
  }
  const obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}


//测试
function Person(name) {
  this.name = name
  return 123 // 返回数字（基本类型）
}
// 原生 new
const p1 = new Person('张三')
console.log(p1) // Person { name: '张三' }，忽略了return 123，返回实例

// 用你的 myNew
const p2 = myNew(Person, '张三')
// res = 123，123 instanceof Object → false，所以返回 obj
console.log(p2)