import { ref, onUnmounted, watch } from 'vue';

export function useTimer(initialSeconds) {
  // 使用 ref 创建响应式状态，存储当前秒数
  const seconds = ref(initialSeconds);
  // 存储定时器 ID
  let intervalId = null;

  // 定义 tick 函数，每秒减少秒数
  const tick = () => {
    seconds.value--;
  };

  // 监听 seconds 变化，控制定时器的启动和停止
  watch(seconds, (newSeconds) => {
    // 清除之前的定时器
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    // 如果秒数大于 0，启动新的定时器
    if (newSeconds > 0) {
      intervalId = setInterval(tick, 1000);
    }
  }, { immediate: true }); // immediate: true 表示初始化时立即执行一次

  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  // 定义重置定时器函数
  const resetTimer = (newSeconds) => {
    seconds.value = newSeconds;
  };

  // 返回当前秒数和重置函数
  return {
    seconds,
    resetTimer
  };
}