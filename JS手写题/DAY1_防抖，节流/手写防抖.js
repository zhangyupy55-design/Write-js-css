function dedounce(fuc,wait){
  let timer= null

  return function(){
    let context = this
    let args = arguments
    if (timer){
      clearTimeout(timer)
    }
    timer = setTimeout(function(){
      fuc.apply(context,args)
    },wait)
  }
}
console.log(new Date())