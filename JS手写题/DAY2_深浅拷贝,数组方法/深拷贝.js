function deepCopy(obj) {
  if ( obj instanceof Date) return new Date(obj)
  if ( obj instanceof RegExp) return new RegExp(obj)
  if ( obj instanceof Error) return new Error(obj.message)
  if ( obj instanceof Function) return function (...args) {
    return obj.call(this, ...args)
  }
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }
  }
}

const aa = function(a,b) {
  console.log(a+b)
}

const bb = deepCopy(aa)
bb(1,2)

