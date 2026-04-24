
function deepCopy(obj) {
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Error) return new Error(obj.message)
  if(obj instanceof Function) return function(...args) {
    return obj.call(this, ...args)
  }
  if(!obj || typeof obj !== "object") return obj
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if(obj.hasOwnProperty(key)){
      if(typeof obj[key] === "object") { // att obj[key]
        newObj[key] = deepCopy(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  return newObj
}
