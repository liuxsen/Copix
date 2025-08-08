const { app, BrowserWindow, session } = require('electron')
const path = require('node:path')
const os = require('node:os')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  // win.webContents.openDevTools()
  win.loadFile('index.html')
}

app.on('ready', async () => {
  // vue路径
  const list = '/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/7.7.7_0'.split('/')
  // react路径
  // const list2 = '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/6.1.5_0'.split('/')
  const vueDevToolsPath = path.join(
    os.homedir(),
    ...list
  )
  console.log(vueDevToolsPath);
  
  try {
    await session.defaultSession.extensions.loadExtension(vueDevToolsPath)
  } catch (error) {
    console.log(error);
  }
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})