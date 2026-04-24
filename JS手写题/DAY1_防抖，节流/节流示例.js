// 节流函数实现
function throttle(func, wait) {
    // 定义开始时间
    let startTime = 0;
    
    // 返回一个新函数
    return function() {
        // 保存this指向和参数
        const context = this;
        const args = arguments;
        
        // 获取当前时间
        const now = Date.now();
        
        // 计算剩余时间
        const remaining = wait - (now - startTime);
        
        // 如果剩余时间小于等于0，执行函数
        if (remaining <= 0) {
            // 更新开始时间
            startTime = now;
            // 执行原函数
            func.apply(context, args);
        }
    };
}

// 测试节流函数
function testThrottle(message) {
    console.log('节流执行：', message, '时间：', new Date().toLocaleTimeString());
}

// 创建节流函数实例
const throttledTest = throttle(testThrottle, 1000);

// 测试场景1：模拟滚动事件
console.log('=== 测试场景1：模拟滚动事件 ===');
for (let i = 0; i < 11; i++) {
    setTimeout(() => {
        console.log(`滚动事件 ${i+1}`);
        throttledTest(`滚动位置 ${i*100}`);
    }, i * 100);
}

// // 测试场景2：模拟鼠标移动
// console.log('\n=== 测试场景2：模拟鼠标移动 ===');
// const throttledMouseMove = throttle(function(x, y) {
//     console.log('鼠标移动到：', x, y);
// }, 500);

// // 模拟连续鼠标移动
// for (let i = 0; i < 6; i++) {
//     setTimeout(() => {
//         console.log(`鼠标移动事件 ${i+1}`);
//         throttledMouseMove(i*10, i*20);
//     }, i * 100);
// }

