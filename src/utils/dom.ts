/**
 *  获取 / 设置 自定义属性
 * @param el 元素
 * @param name 属性名
 * @param val 属性值
 */
export function getData(el: HTMLElement, name: string, val?: string) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    // 如果有val就设置自定义属性
    return el.setAttribute(name, val)
  } else {
    //   获取自定义属性
    return el.getAttribute(name)
  }
}
