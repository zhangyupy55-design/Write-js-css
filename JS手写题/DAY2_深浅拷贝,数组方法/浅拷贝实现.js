// 浅拷贝实现
function shallowCopy(obj) {
    // 如果不是对象或为null，直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 根据原对象类型创建新对象
    const newObj = Array.isArray(obj) ? [] : {};
    
    // 遍历原对象的所有可枚举属性
    for (let key in obj) {
        // 只复制对象自身的属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    
    return newObj;
}

// 测试数据
const testObj = {
    name: '张三',
    age: 25,
    assets: {
        money: 1000000,
        car: {
            brand: '奔驰400',
            color: '红色'
        }
    },
    
    hobbies: ['篮球', '游戏', '音乐'],
    sayHello: function() {
        console.log('Hello!');
    }
};

// 测试浅拷贝
console.log('=== 测试浅拷贝 ===');
console.log('原对象:', testObj);

const shallowResult = shallowCopy(testObj);
console.log('浅拷贝结果:', shallowResult);


function shallow(obj) {
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}