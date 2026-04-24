const curry = (fn, ...args) => {
  if(args.length >= fn.length) {
    return fn(...args)
  }
  return (...rest) => {
    return curry(fn, ...args, ...rest)
  }
}

// bfe
function curry(fn) {
  return function curried(...args) {
    if(fn.length <= args.length) {
      return fn(...args)
    }
    return (...rest) => {
      return curried(...args, ...rest)
    }
  }
}