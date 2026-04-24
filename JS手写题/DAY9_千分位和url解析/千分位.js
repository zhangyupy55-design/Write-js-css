toLocaleString()

const thousandSeparator = function (n) {
  //先转字符串
  n = n.toString();
  let count = 0;
  const arr = [];
  for (let i = n.length - 1; i >= 0; i--) {
    count++;
    if (count < 4) {
      arr.push(n[i]);
    } else {
      arr.push(...[".", n[i]]);
      count = 1;
    }
  }
  return arr.reverse().join("");
};

const thousandSplit = function(n) {
  
}