<template>
  <div class="box">
    <AreaPick>
      <Drawer/>
    </AreaPick>
    <ToolPane />
    
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { IPC_CHANNELS } from '../../../share/channel';
import AreaPick from './components/AreaPick.vue';
import Drawer from './components/Drawer.vue';
import ToolPane from './components/ToolPane.vue';

// 开始截屏
function onClose() {
  if(canvasRef.value){
    canvasRef.value.toBlob(async (blob) => {
      if (!blob) return
      const arrayBuffer = await blob.arrayBuffer()
      window.electronApi.send(IPC_CHANNELS.SCREENSHOT.END_CAPTURE, { buffer: arrayBuffer })
    }, 'image/png')
  }
}

interface Display {
  height: number
  id : number
  scaleFactor: number
  width: number
  x: number
  y: number
}
type TCAPTURE_DATA = {
  display: Display
  imageBuffer: Buffer
}

const canvasRef = ref<HTMLCanvasElement>()
async function renderBlob({display, imageBuffer}: TCAPTURE_DATA) {
  const uint8 = new Uint8Array(imageBuffer)
  const blob = new Blob([uint8], { type: 'image/png' })
  const bitmap = await createImageBitmap(blob)
  if(canvasRef.value){
    const realWidth = display.width * display.scaleFactor
    const realHeight = display.height * display.scaleFactor
    // 用实际像素创建 canvas
    canvasRef.value.width = realWidth
    canvasRef.value.height = realHeight
    canvasRef.value.style.width = display.width + 'px'
    canvasRef.value.style.height = display.height + 'px'
    const ctx = canvasRef.value.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0)
  }
}

onMounted(() => {
  window.electronApi.on(IPC_CHANNELS.SCREENSHOT.GET_CAPTURE, (e, data: TCAPTURE_DATA) => {
    renderBlob(data)
  })
  window.electronApi.send(IPC_CHANNELS.SCREENSHOT.READY_CAPTURE)
})

</script>

<style>
.box {
  background-color: #fff;
  color: #333;
  width: 100vw;
  height: 100vh;
}
</style>