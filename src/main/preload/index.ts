// const { contextBridge, ipcRenderer } = require('electron')

import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';


//  用Electron 的 contextBridge 安全地
// 将部分 【IPC 方法】暴露到渲染进程的全局对象 【window.electron】 上，方便渲染进程调用主进程功能。
contextBridge.exposeInMainWorld('electronApi', {
  nodeVersion: () => process.versions.node,
  chromeVersion: () => process.versions.chrome,
  electronVersion: () => process.versions.electron,
  
  // 通用的函数,在渲染进程监听主进程的消息
  on: (channel: string, callback: (e: IpcRendererEvent, data: any) => void) => {
    ipcRenderer.on(channel, callback)
  },
  // 通用的函数,在渲染进程取消监听主进程的消息
  off: (channel: string, callback: (e: IpcRendererEvent, data: any) => void) => {
    ipcRenderer.removeListener(channel, callback)
  },
  // 给主进程发送消息
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data)
  },
  // 给主进调用消息，返回promise
  invoke: (channel: string, data: any) => {
    return ipcRenderer.invoke(channel, data)
  }
})
