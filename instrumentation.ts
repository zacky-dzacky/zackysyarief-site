export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const noop = () => {}
    const noopStorage = {
      getItem: () => null,
      setItem: noop,
      removeItem: noop,
      clear: noop,
      key: () => null,
      length: 0,
    }
    try {
      if (typeof globalThis.localStorage?.getItem !== 'function') {
        Object.defineProperty(globalThis, 'localStorage', {
          value: noopStorage,
          writable: true,
          configurable: true,
        })
      }
    } catch {
      Object.defineProperty(globalThis, 'localStorage', {
        value: noopStorage,
        writable: true,
        configurable: true,
      })
    }
  }
}
