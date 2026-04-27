import { ref, watch } from 'vue'

/**
 * 自定义定时器组合式函数
 * @param {number} initialSeconds 初始秒数
 * @returns {Object} { seconds, resetTimer }
 */
export function useTimer(initialSeconds) {
  // 对应 React useState：用 ref 定义响应式秒数
  const seconds = ref(initialSeconds)

  let intervalId = null

  // 对应 React 里的 tick 函数：每秒减 1
  const tick = () => {
    seconds.value -= 1
  }

  // 对应 React useEffect + [seconds] 依赖监听
  watch(
    seconds,
    (newVal) => {
      // 先清除上一次的定时器（React return 清除函数的逻辑）
      if (intervalId) {
        clearInterval(intervalId)
      }

      // 秒数 > 0 才启动定时器
      if (newVal > 0) {
        intervalId = setInterval(tick, 1000)
      }
    },
    { immediate: true } // 立刻执行一次，对应组件初始化启动定时器
  )

  // 重置定时器，对应 React 的 resetTimer
  const resetTimer = (newSeconds) => {
    seconds.value = newSeconds
  }

  // 暴露出去给组件使用
  return {
    seconds,
    resetTimer
  }
}

//第二版
import { ref, onUnmounted } from 'vue'

export function TwouseTimer(initialSeconds) {
  const seconds = ref(initialSeconds)
  let intervalId = null

  // 启动倒计时
  function start() {
    // 防止重复开定时器
    if (intervalId) return

    intervalId = setInterval(() => {
      seconds.value--
      // 到0就停
      if (seconds.value <= 0) {
        clearInterval(intervalId)
        intervalId = null
      }
    }, 1000)
  }

  // 重置
  const resetTimer = (newSeconds) => {
    // 先停掉旧的
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    seconds.value = newSeconds
    // 重新启动
    start()
  }

  // 组件销毁时清定时器（防内存泄漏）
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  // 初始化启动
  start()

  return { seconds, resetTimer }
}