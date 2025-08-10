import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '../../share/channel'
import { winContainer } from '../winContainer';
import Screenshots from '../winContainer/screenshot/screenshot';

export const bootScreenShot = () => {
  console.log(IPC_CHANNELS.SCREENSHOT.PIN);
  
  ipcMain.on(IPC_CHANNELS.SCREENSHOT.PIN, (_e: any, data) => {
    console.log(data);
  })
  console.log(IPC_CHANNELS.SCREENSHOT.PIN);
  
  ipcMain.handle(IPC_CHANNELS.SCREENSHOT.PIN, (_e, data) => {
    console.log('handle', data);
    winContainer.create(data.id, {})
    return {}
  })

  ipcMain.on(IPC_CHANNELS.SCREENSHOT.START_CAPTURE, async (e, data) => {
    const screenShot = new Screenshots()
    const png = await screenShot.startCapture()
    console.log(data);
    console.log(png);
  })
}