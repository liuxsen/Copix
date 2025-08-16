<template>
  <div id="area-pick" class="bg-red" ref="boxRef"
    :style="{ position: 'absolute', left: boxLeft + 'px', top: boxTop + 'px', width: boxWidth + 'px', height: boxHeight + 'px' }">
    <slot :boxInfo="boxInfo"/>
  </div>
  <div class="box-cover" v-if="hasBoxRender" :style="topCoverStyle"></div>
  <div class="box-cover bottom" v-if="hasBoxRender" :style="bottomCoverStyle"></div>
  <div class="box-cover" v-if="hasBoxRender" :style="leftCoverStyle"></div>
  <div class="box-cover" v-if="hasBoxRender" :style="rightCoverStyle"></div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, onMounted, onUnmounted, ref } from 'vue';
import interact from 'interactjs'
import { bus, BUS_CHANNEL } from '../../../utils/bus';
import { useOnKeyDown } from '../../../hooks/useOnKeyDown';
import { IPC_CHANNELS } from '../../../../share/channel';

const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const boxLeft = ref(0)
const boxTop = ref(0)
const boxWidth = ref(0)
const boxHeight = ref(0)

const boxInfo = computed(() => {
  return {
    left: boxLeft.value,
    top: boxTop.value,
    width: boxWidth.value,
    height: boxHeight.value    
  }
})

const hasBoxRender = computed(() => {
  if(boxHeight.value <0 || boxHeight.value < 0) return false
  return true
})

// 上下左右的style
const topCoverStyle = computed<CSSProperties>(() => {
  if(!hasBoxRender.value){
    return {}
  }
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    'width': '100vw',
    'height': boxTop.value + 'px',
  }
})

const bottomCoverStyle = computed<CSSProperties>(() => {
  if(!hasBoxRender.value){
    return {}
  }
  const top = boxTop.value + boxHeight.value
  return {
    'top': top + 'px',
    'position': 'absolute',
    // transform: `translate(0px, ${top} + 'px')`,
    'width': '100vw',
    'height': `calc(100vh - ${top}px)`
  }
})

const leftCoverStyle = computed<CSSProperties>(() => {
  if(!hasBoxRender.value){
    return {}
  }
  return {
    'position': 'absolute',
    'top': boxTop.value + 'px',
    'width': boxLeft.value + 'px',
    'left': 0,
    'height': boxHeight.value + 'px'
  }
})
const rightCoverStyle = computed<CSSProperties>(() => {
  if(!hasBoxRender.value){
    return {}
  }
  const right = boxLeft.value + boxWidth.value;
  return {
    'position': 'absolute',
    'top': boxTop.value + 'px',
    'width': `calc(100vw - ${right}px)`,
    'left': `${right}px`,
    'height': boxHeight.value + 'px'
  }
})


const boxRef = ref<HTMLDivElement>()
const parentInteRactRef = ref()
const boxInteRactRef = ref()
function init() {
  parentInteRactRef.value = interact(document)
  parentInteRactRef.value
  .on('down', (e: MouseEvent) => {
    if(e.target === boxRef.value){
      return
    }
    if(boxWidth.value || boxHeight.value) return
    isDrawing.value = true
    startX.value = e.clientX
    startY.value = e.clientY
    bus.emit(BUS_CHANNEL.AREAPICK.START_AREA)
  })
  .on('move', (e: MouseEvent) => {
    // console.log(e);
    if(!isDrawing.value) return
    const currentX = e.clientX
    const currentY = e.clientY
    boxWidth.value = Math.abs(currentX - startX.value)
    boxHeight.value = Math.abs(currentY - startY.value)
    boxLeft.value = currentX < startX.value ? currentX : startX.value
    boxTop.value = currentY < startY.value ? currentY : startY.value
    bus.emit(BUS_CHANNEL.AREAPICK.ING_AREA)
  })
  .on('up', () => {
    if (!isDrawing.value) return
    isDrawing.value = false
    if(!boxRef.value) return
    bus.emit(BUS_CHANNEL.AREAPICK.END_AREA)
    
    boxInteRactRef.value = interact(boxRef.value)
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
          }),
        ],
        listeners: {
          start(event) {
            event.stopPropagation()
            bus.emit(BUS_CHANNEL.AREAPICK.MOVING_START_AREA)
          },
          move(event){
            boxLeft.value += event.dx
            boxTop.value += event.dy
            bus.emit(BUS_CHANNEL.AREAPICK.MOVING_AREA)
          },
          end(){
            bus.emit(BUS_CHANNEL.AREAPICK.MOVING_END_AREA)
          }
        }
      })
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        invert: 'reposition',
        modifiers: [
          // 限制四条边不超过窗口（或改成 'parent' 限制在父容器）
          interact.modifiers.restrictEdges({
            outer: document.body,
          }),
        ],
        listeners: {
          start(){
            bus.emit(BUS_CHANNEL.AREAPICK.START_AREA)
          },
          move(event) {
            boxLeft.value = event.rect.left;
            boxTop.value = event.rect.top;
            boxWidth.value = event.rect.width;
            boxHeight.value = event.rect.height;
            bus.emit(BUS_CHANNEL.AREAPICK.RESIZE_AREA)
          },
          end(){
            bus.emit(BUS_CHANNEL.AREAPICK.RESIZE_END_AREA)
          }
        },
    })

  })
}

onMounted(() => {
  init()
})


function clear() {
  parentInteRactRef.value.unset()
  boxInteRactRef.value.unset()
  parentInteRactRef.value = null
  boxInteRactRef.value = null
  boxLeft.value = 0
  boxTop.value = 0
  boxWidth.value = 0
  boxHeight.value = 0
}

onUnmounted(() => {
  clear()
})

useOnKeyDown('Escape', () => {
  clear()
  window.electronApi.send(IPC_CHANNELS.SCREENSHOT.CANCEL_CAPTURE)
})

</script>

<style lang="less" scoped>
.box-cover {
  background-color: rgba(0, 0, 0, 0.3);
  will-change: transform;
  transform: translateZ(0);
}
</style>