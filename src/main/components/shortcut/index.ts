import { globalShortcut, ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../share/channel';
import Screenshots from '../../winContainer/screenshot/screenshot';

export function bootShortCut() {
  // 注册截屏快捷键
  ipcMain.handle(IPC_CHANNELS.SHORT_CUT.REGISTER_SHORTCUT_SCREEN, async (e, shortcut: string) => {
    const isRegistered = globalShortcut.isRegistered(shortcut)
    if(isRegistered){
      globalShortcut.unregister(shortcut)
    }
    return globalShortcut.register(shortcut, async () => {
      // 注册回调
      console.log("快捷键触发");
      const screenShot = new Screenshots()
      const png = await screenShot.startCapture()
    })
  })

}