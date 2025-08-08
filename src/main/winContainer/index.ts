// 定义一个窗口管理的容器

import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { getPreloadPath } from '../utils/pathUtil';

class WinContainer {
  private windows = new Map<string, BrowserWindow>()
  create(id: string, options: BrowserWindowConstructorOptions){
    const win = new BrowserWindow({
      ...options,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: getPreloadPath(),
        ...options.webPreferences
      }
    })
    this.windows.set(id, win)
    // 窗口关闭时移除引用
    win.on('closed', () => {
      this.windows.delete(id)
    })
    return win;
  }

  // 根据 ID 获取窗口
  get(id: string) {
    return this.windows.get(id)
  }

  // 获取所有窗口
  getAll() {
    return Array.from(this.windows.values())
  }

  // 关闭指定窗口
  close(id: string) {
    const win = this.windows.get(id)
    if (win) {
      win.close()
      this.windows.delete(id)
    }
  }

  // 关闭所有窗口
  closeAll() {
    for (const win of this.windows.values()) {
      win.close()
    }
    this.windows.clear()
  }
}

export const winContainer = new WinContainer()