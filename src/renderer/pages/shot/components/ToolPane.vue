<template>
  <div class="flex tool-pane" ref="box"
    :style="toolTipStyle"
    v-show="show"
  >
    <PhRectangle :size="28" />
    <PhCircle :size="28" />
    <PhMinus :size="28" />
    <PhArrowUpRight :size="28" />
    <PhPen :size="28" />
    <PhGridFour :size="28" />
    <PhTag :size="28" />
    <PhX :size="28" />
    <PhDownload :size="28" />
    <PhCopy :size="28" />
  </div>
</template>

<script lang="ts" setup>
import { PhCopy, PhRectangle, PhCircle, PhMinus,
  PhArrowUpRight,
  PhPen,
  PhGridFour,
  PhTag,
  PhX,
  PhDownload
 } from '@phosphor-icons/vue'
  import { CSSProperties, onBeforeUnmount, onMounted, ref } from 'vue';
  import {computePosition, flip, offset, shift} from '@floating-ui/dom'
import { bus, BUS_CHANNEL } from '../../../utils/bus';

  const toolTipStyle = ref<CSSProperties>()

  const box = ref<HTMLDivElement>()

  function getPostion() {
    show.value = true
    const drawerBox = document.getElementById('area-pick')
    computePosition(drawerBox!, box.value!, {
      placement: 'bottom',
      middleware: [offset(6), flip(), shift({padding: 5})],
    }).then(({x, y}) => {
      toolTipStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
      }
    });
  }

  const show = ref(false)
  function hidden() {
    show.value = false
  }
  
  onMounted(() => {
    bus.on(BUS_CHANNEL.AREAPICK.START_AREA, hidden)
    bus.on(BUS_CHANNEL.AREAPICK.END_AREA, getPostion)
    bus.on(BUS_CHANNEL.AREAPICK.MOVING_START_AREA, hidden)
    bus.on(BUS_CHANNEL.AREAPICK.MOVING_END_AREA, getPostion)
    bus.on(BUS_CHANNEL.AREAPICK.RESIZE_START_AREA, hidden)
    bus.on(BUS_CHANNEL.AREAPICK.RESIZE_END_AREA, getPostion)
  })
  onBeforeUnmount(() => {
    bus.off(BUS_CHANNEL.AREAPICK.START_AREA, hidden)
    bus.off(BUS_CHANNEL.AREAPICK.END_AREA, getPostion)
    bus.off(BUS_CHANNEL.AREAPICK.MOVING_START_AREA, hidden)
    bus.off(BUS_CHANNEL.AREAPICK.MOVING_END_AREA, getPostion)
    bus.off(BUS_CHANNEL.AREAPICK.RESIZE_START_AREA, hidden)
    bus.off(BUS_CHANNEL.AREAPICK.RESIZE_END_AREA, getPostion)
  })

</script>

<style lang="less" scoped>
.tool-pane {
  background: #222;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
}
</style>