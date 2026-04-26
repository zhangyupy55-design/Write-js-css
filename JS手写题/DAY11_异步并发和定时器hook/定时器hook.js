import React, { useState, useEffect } from 'react';

// 自定义定时器 Hook
const useTimer = (initialSeconds) => {
  // 使用 useState 来创建 seconds 状态变量，初始值为传入的 initialSeconds
  const [seconds, setSeconds] = useState(initialSeconds);

  // 使用 useEffect 来处理定时器逻辑
  useEffect(() => {
    let intervalId; // 保存定时器的 ID

    // 定义 tick 函数，每秒减少秒数
    const tick = () => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    };

    // 如果 seconds 大于 0，启动定时器
    if (seconds > 0) {
      intervalId = setInterval(tick, 1000);
    }

    // 返回一个清除函数，在组件卸载或定时器重置时执行
    return () => {
      clearInterval(intervalId); // 清除定时器
    };
  }, [seconds]); // useEffect 依赖于 seconds 变量，只有在 seconds 变化时才会执行

  // 定义 resetTimer 函数，用于重置定时器的秒数
  const resetTimer = (newSeconds) => {
    setSeconds(newSeconds);
  };

  // 返回当前秒数和重置定时器函数
  return { seconds, resetTimer };
};

export default useTimer;
