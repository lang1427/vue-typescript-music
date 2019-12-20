/**
 *
 * @param funcName 需要进行防抖的函数名
 * @param delay 防抖所需时间
 */
export function debounce(funcName, delay = 50) {
  let timer = null

  return function () {
    if (timer) clearInterval(timer)
    timer = window.setInterval(() => {
      funcName.apply(this)
    }, delay)
  }
}