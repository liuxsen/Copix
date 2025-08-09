import { app, BrowserWindow } from 'electron'
import { isDev } from './utils/constantUtil'
import path from 'path'
import { getPreloadPath } from './utils/pathUtil'
import { bootScreenShot } from './ipc/screenShot'

app.on('ready', () => {
  bootScreenShot()
  console.log("aaabb");
  const win = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    }
  })
  if(isDev()){
    win.loadURL('http://localhost:5123')
  } else {
    win.loadFile(path.join(app.getAppPath(), 'dist-renderer', 'index.html'))
  }


  // ipcMain.handle('event:invoke', (e, data) => {
  //   console.log(data);
  //   return {pong: true}
  // })

  // ipcMain.on('event:send',(e, data) => {
  //   console.log(data);
  // })

  // // ipcMain.emit('event:on', {'event:on': 'from:main'})
  // setTimeout(() => {
  //   win.webContents.send('event:on', {'event:on': 'from:main'})
  // }, 4000);
})

