// 防抖函数实现
function debounce(func, wait) {
    // 定义定时器变量
    let timeout;
    
    // 返回一个新函数
    return function() {
        // 保存this指向和参数
        const context = this;
        const args = arguments;
        
        // 清除之前的定时器
        if (timeout) clearTimeout(timeout);
        
        // 设置新的定时器
        timeout = setTimeout(function() {
            // 执行原函数，保持this指向和参数
            func.apply(context, args);
        }, wait);
    };
}

// 测试防抖函数
function testDebounce(message) {
    console.log('防抖执行：', message, '时间：', new Date().toLocaleTimeString());
}

// 创建防抖函数实例
const debouncedTest = debounce(testDebounce, 3000);

// 测试场景1：模拟搜索输入
console.log('=== 测试场景1：模拟搜索输入 ===');
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(`输入第${i+1}次`);
        debouncedTest(`搜索关键词 ${i+1}`);
    }, i * 200);
}

// // 测试场景2：模拟窗口 resize
// console.log('\n=== 测试场景2：模拟窗口 resize ===');
// const debouncedResize = debounce(function() {
//     console.log('窗口大小改变，重新计算布局');
// }, 500);

// // 模拟连续 resize
// for (let i = 0; i < 3; i++) {
//     setTimeout(() => {
//         console.log(`触发 resize 事件 ${i+1}`);
//         debouncedResize();
//     }, i * 100);
// }

// // 测试场景3：按钮点击
// console.log('\n=== 测试场景3：按钮点击 ===');
// const debouncedClick = debounce(function() {
//     console.log('按钮点击事件执行');
// }, 800);

// // 模拟快速连续点击
// for (let i = 0; i < 4; i++) {
//     setTimeout(() => {
//         console.log(`点击按钮 ${i+1}`);
//         debouncedClick();
//     }, i * 150);
// }

// console.log('\n防抖测试完成，只会在最后一次调用后执行');
