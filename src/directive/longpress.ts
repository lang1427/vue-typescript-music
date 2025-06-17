const eventHandlers = new WeakMap<
  HTMLElement,
  { touchStart: () => void; touchMove: () => void; touchEnd: () => void }
>();

let __timer = null as number | null;
const __clearTimer = () => {
  if (__timer !== null) {
    window.clearTimeout(__timer);
    __timer = null;
  }
};

export const Longpress = {
  mounted(el: HTMLElement, binding: any) {
    const __handleTouchStart = () => {
      if (__timer === null) {
        __timer = window.setTimeout(() => {
          try {
            binding.value.methods(binding.value.params);
          } catch (error) {
            console.error("长按事件执行方法时出错:", error);
          }
        }, 300);
      }
    };

    const __handleTouchMove = () => {
      __clearTimer();
    };

    const __handleTouchEnd = () => {
      __clearTimer();
    };

    eventHandlers.set(el, {
      touchStart: __handleTouchStart,
      touchMove: __handleTouchMove,
      touchEnd: __handleTouchEnd,
    });

    el.addEventListener("touchstart", __handleTouchStart);

    el.addEventListener("touchmove", __handleTouchMove);

    el.addEventListener("touchend", __handleTouchEnd);
  },
  unmounted(el: HTMLElement) {
    const handlers = eventHandlers.get(el);
    if (!handlers) return;
    el.removeEventListener("touchstart", handlers.touchStart);
    el.removeEventListener("touchmove", handlers.touchMove);
    el.removeEventListener("touchend", handlers.touchEnd);
  },

  // var event = new CustomEvent("longpress", {"detail":{"message":'长按事件'}})
  // el.dispatchEvent(event)
};

/**
 *

 使用方式：
params可以是 undefined, string, number, boolean, array, object 类型的值

  html:

    <div style="padding:30px;background:green;" v-longpress="{'methods':didi,'params':'123'}" >自定义事件</div>


  script:

    didi(id:string){
        console.log(id)
        console.log('didi')
    }


 *
 */
