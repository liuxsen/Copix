import { onMounted, onUnmounted } from 'vue';

/** 监听鼠标按下事件 */
export function useOnKeyDown(
  targetKey?: string,
  handler?: () => any
) {
  function onDown(e: KeyboardEvent) {
    if(e.key === targetKey){
      handler && handler()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onDown)
  })
  
}