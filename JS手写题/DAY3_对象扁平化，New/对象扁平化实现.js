const flat = (arr, depth = 1) => {
  let res = [] // 必须是 let
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i]) && depth) {
      res = res.concat(flat(arr[i], depth - 1)) // 返回新数组
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// 对象扁平化
function objectFlat(obj = {}) {
  const res = {}
  function flat(item, preKey = '') {
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        flat(val, newKey)
      } else {
        res[newKey] = val
      }
    })
  }
  flat(obj)
  return res
}

// 测试
const source = {
  a: { 
    b: { c: 1, d: 2 },
    e: 3 
  },
  f: { g: 2     
  } 
}

console.log(objectFlat(source));