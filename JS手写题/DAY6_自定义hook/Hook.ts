import { onUnmounted } from 'vue'

function useDebounce<T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  // 用闭包变量保存定时器 ID（也可以用 ref，这里用闭包更简洁）
  let timer: number | null = null

  const debouncedCallback = (...args: T) => {
    // 清除上一次的定时器
    if (timer !== null) clearTimeout(timer)

    // 设置新定时器
    timer = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }

  // 【重要】组件卸载时自动清除定时器，防止内存泄漏
  onUnmounted(() => {
    if (timer !== null) clearTimeout(timer)
  })

  return debouncedCallback
}

export default useDebounce