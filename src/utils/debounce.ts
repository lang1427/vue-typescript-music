/**
 *
 * @param funcName 需要进行防抖的函数名
 * @param delay 防抖所需时间
 */
export function debounce(funcName: any, delay: number = 50) {
  let timer: any = null

  return function(this: any) {
    if (timer) clearTimeout(timer)
    timer = window.setTimeout(() => {
      funcName.apply(this)
    }, delay)
  }
}
