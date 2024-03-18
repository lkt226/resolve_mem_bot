const runAfter = (callback: Function, delay: number) => {
  setTimeout(() => {
    callback()
  }, delay * 1000)
}

export default runAfter