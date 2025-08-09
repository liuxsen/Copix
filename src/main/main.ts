import { app, BrowserWindow, session } from 'electron'
import { isDev } from './utils/constantUtil'
import path from 'path'
import os from 'os'
import { bootScreenShot } from './ipc/screenShot'
import { winContainer } from './winContainer'

app.on('ready', () => {
  bootScreenShot()
  const win = winContainer.create('main', {})
  if(isDev()){
    win.loadURL('http://localhost:5123')
  } else {
    win.loadFile(path.join(app.getAppPath(), 'dist-renderer', 'index.html'))
  }
  // 加载插件
  if(isDev()){
    // 加载vue devtool插件；注意路径有可能自动升级版本，所以如果不生效，需要核对下本地路径
    const vuePath = '/Library/Application\ Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/7.7.7_1'.split('/')
    const vueDevToolsPath = path.join(
      os.homedir(),
      ...vuePath
    )
    console.log(vueDevToolsPath);
    session.defaultSession.loadExtension(vueDevToolsPath)
  }
  // 拦截关闭窗口
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const win = winContainer.create('main', {})
      if(isDev()){
        win.loadURL('http://localhost:5123')
      } else {
        win.loadFile(path.join(app.getAppPath(), 'dist-renderer', 'index.html'))
      }
    }
  })

})

