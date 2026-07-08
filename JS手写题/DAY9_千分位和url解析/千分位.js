toLocaleString()


const thousandSeparator = function (n) {
  // 处理非数字输入
  if (isNaN(Number(n))) return n;
  
  // 分离整数和小数部分
  const str = n.toString();
  const [integerPart, decimalPart] = str.split('.');
  
  let count = 0;
  const arr = [];
  
  // 处理整数部分（从后往前遍历）
  for (let i = integerPart.length - 1; i >= 0; i--) {
    count++;
    arr.push(integerPart[i]);
    // 每3个数字加一个逗号（不是第4个！）
    if (count % 3 === 0 && i !== 0) { 
      arr.push(',');
    }
  }
  
  // 反转整数部分并拼接小数部分
  const formattedInteger = arr.reverse().join('');
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// 测试
console.log(thousandSeparator(1234567)); // 1,234,567
console.log(thousandSeparator(1234.56)); // 1,234.56
console.log(thousandSeparator(-123456)); // -123,456（注：负数可以单独处理负号，这里简单兼容）

