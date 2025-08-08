import { app, BrowserWindow } from 'electron'
import { isDev } from './utils/constantUtil'
import path from 'path'

app.on('ready', () => {
  const win = new BrowserWindow({})
  if(isDev()){
    win.loadURL('http://localhost:5123')
  } else {
    win.loadFile(path.join(app.getAppPath(), 'dist-renderer', 'index.html'))
  }
})