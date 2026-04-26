class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(fn)
  }

  off(event, fn) {
    const handlers = this.events[event]
    if (!handlers) return

    const index = handlers.indexOf(fn)
    if (index !== -1) {
      handlers.splice(index, 1)
    }
  }

  emit(event, ...args) {
    const handlers = this.events[event]
    if (!handlers) return

    // 拷贝一份，避免 emit 时修改数组
    handlers.slice().forEach(fn => fn(...args))
  }
}