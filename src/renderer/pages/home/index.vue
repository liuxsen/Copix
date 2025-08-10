<template>
  <button @click="onCapture">start capture</button>
  <RouterLink to="/shot">screen-shot</RouterLink>
</template>

<script lang="ts" setup>
import { IPC_CHANNELS } from '../../../share/channel';

const onCapture = () => {
  window.electron.send(IPC_CHANNELS.SCREENSHOT.START_CAPTURE)
}
</script>