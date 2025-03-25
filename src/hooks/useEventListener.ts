import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'

const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any,
) => {
  if (isRef(target)) {
    watch(target, (newValue, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      newValue?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  onBeforeUnmount(() => {
    // unref获取对应的响应式变量的值
    unref(target)?.removeEventListener(event, handler)
  })
}
export default useEventListener
