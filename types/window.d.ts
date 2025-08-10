export {}
declare global {
  interface Window {
    electron: {
      /** 调用主进程的handle */
      invoke: (channel: string, data: any) => Promise<any>
      /** 给主进程发送消息 */
      send: (channel: string, data?: any) => void
      /** 获取到主进程发送过来的事件 */
      on: (channel: string, callback: (e: any, data: any) => void) => void;
    }
  }
}