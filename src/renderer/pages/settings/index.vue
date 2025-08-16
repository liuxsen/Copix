<template>
  <div>
    <input style="display: block;width: 600px;" v-model="bindKey" @focus="onFocus" @blur="onBlur" @keydown="onKeyDown"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IPC_CHANNELS } from '../../../share/channel';

let tempKey = ''
const bindKey = ref('')
const bindKeys = ref<string[]>([])
function onFocus() {
  tempKey = bindKey.value
  bindKey.value = ''
  bindKeys.value = []
}
function onBlur() {
  if(bindKeys.value.length === 0){
    bindKey.value = tempKey
    tempKey = ''
  } else {
    bindKeys.value = []
  }
}

async function onKeyDown(e: KeyboardEvent) {
  if (e.ctrlKey && !bindKeys.value.includes('Control') ) bindKeys.value.push('Control')
  if (e.metaKey && !bindKeys.value.includes('Command')) bindKeys.value.push('Command')
  if (e.altKey && !bindKeys.value.includes('Alt')) bindKeys.value.push('Alt')
  if (e.shiftKey && !bindKeys.value.includes('Shift')) bindKeys.value.push('Shift')
  const mainKey = e.key.length === 1 ? e.key.toUpperCase() : e.key
  if (!['Control','Meta','Alt','Shift', 'Command'].includes(mainKey)) {
    bindKeys.value.push(mainKey)
  }
  // 拼接成 accelerator
  const filterKeys = bindKeys.value.filter(item => {
    return !['Control','Meta','Alt','Shift', 'Command'].includes(item)
  })
  if(filterKeys.length === 0){
    bindKeys.value = []
    return
  }
  bindKey.value = bindKeys.value.join('+')
  const registerRes = await window.electronApi.invoke(IPC_CHANNELS.SHORT_CUT.REGISTER_SHORTCUT_SCREEN, bindKey.value)
  debugger
}
</script>