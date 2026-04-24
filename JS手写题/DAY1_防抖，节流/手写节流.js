function throttle(func,wait){
  let startTime = 0
  return function (){
    let context = this
    let args = arguments

    const now = Date.now()
    const remain = wait - (now - startTime)
    if (remain <= 0){
      startTime = now
      func.apply(context,args)
    }

  }
}