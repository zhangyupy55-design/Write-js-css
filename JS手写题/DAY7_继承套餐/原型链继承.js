function Person() {
  this.name = "juege"
}

Person.prototype.eating = function () {
  console.log("eating")
}

function Student() {}
Student.prototype = new Person()

// 1.前端实现类的过程中都没有传递参数。
// 2.多个实例对引用类型的操作会被篡改。
// function Person() {
//   this.name = "juege"
//   this.list = [1,2,3] 
// }

// function Student() {}
// Student.prototype = new Person()

//  创建两个子类实例
// const s1 = new Student()
// const s2 = new Student()

// s1 修改引用类型数据
// s1.list.push(999)

// // 你会发现：s2 也被改了！
// console.log(s1.list) // [1,2,3,999]
// console.log(s2.list) // [1,2,3,999]


// 3.打印子类实例，子类继承到的属性在原型里，是永远看不见的。