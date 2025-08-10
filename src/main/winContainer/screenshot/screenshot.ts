import { app, BaseWindow, BrowserView, BrowserWindow, clipboard, ipcMain, nativeImage, WebContentsView } from 'electron';
import Events from 'events';
import { getPreloadPath } from '../../utils/pathUtil';
import { isDev } from '../../utils/constantUtil';
import path from 'path';
import { getDisplay, type Display } from './getDisplay';
import { IPC_CHANNELS } from '../../../share/channel';
import fs from 'fs'

export default class Screenshots extends Events {
  // 窗口
  public $win: BaseWindow | null = null
  // webview
  public $view: WebContentsView = new WebContentsView({
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    },
  });

  constructor(){
    super()
    this.listIPC()
    if(isDev()){
      this.$view.webContents.loadURL('http://localhost:5123/#/shot')
    } else {
      this.$view.webContents.loadFile(path.join(app.getAppPath(), 'dist-renderer', 'index.html#/shot'))
    }
  }

  private isReady(): Promise<void>{
    return new Promise((resolve) => {
      ipcMain.once(IPC_CHANNELS.SCREENSHOT.READY_CAPTURE, (e) => {
        setTimeout(() => {
          resolve()
        }, 4000);
      })
    })
  }

  /**
   * startCapture
   */
  public async startCapture() {
    const display = getDisplay()
    console.log(display);
    await this.createWindow(display)
    const [imageBuffer] = await Promise.all([this.capture(display), this.isReady()]) 
    this.$view.webContents.send(IPC_CHANNELS.SCREENSHOT.GET_CAPTURE, {display, imageBuffer});
    return imageBuffer;
  }

  /**
   * capture
   */
  public async capture(display: Display) {
    const { Monitor } = await import('node-screenshots');
    const monitor = Monitor.fromPoint(
      display.x + display.width / 2,
      display.y + display.height / 2,
    );
    if (!monitor) {
      throw new Error(`Monitor.fromDisplay(${display.id}) get null`);
    }
    const image = await monitor.captureImage();
    const buffer = await image.toPng(true);
    return buffer
    // return `data:image/png;base64,${buffer.toString('base64')}`;
  }

  /**
   * createWindow
   */
  public async createWindow(display: Display):Promise<void> {
    if (!this.$win || this.$win?.isDestroyed?.()) {
      const isDevMode = isDev()
      
      this.$win = new BaseWindow({
        title: 'screenshots',
        x: display.x,
        y: display.y,
        width: display.width,
        height: display.height,
      });

      this.$win.on('show', () => {
        this.$win?.focus();
        this.$view.webContents.openDevTools()
      });

      this.$win.on('closed', () => {
        this.$win = null;
      });

      // 设置view
      this.$win.contentView.addChildView(this.$view)

      // 让窗口暂时失去焦点（避免一创建就抢走用户焦点，有些截图工具会这么做，等真正开始操作时再聚焦）。
      this.$win.blur();
      // 	把窗口放到指定的显示器上，并设置它的大小为该显示器的分辨率和位置。
      this.$win.setBounds(display);
      // 设置 BrowserView 在 BrowserWindow 内的区域。
	    // •	x:0, y:0 表示从窗口左上角开始，宽高等于当前屏幕大小，这样视图就能铺满整个截图窗口。
      this.$view.setBounds({
        x: 0,
        y: 0,
        width: display.width,
        height: display.height,
      });
      // 窗口置顶，保证截图 UI 不会被别的应用盖住。
	    // •	注意：在 Windows 和 macOS 上，这个置顶配合前面的 setVisibleOnAllWorkspaces 可以实现跨桌面始终可见。 
      // this.$win.setAlwaysOnTop(true);
      // 显示窗口（创建win的时候 show: false 是为了初始化时不闪屏，这里手动显示）。
      this.$win.show();
    }
  }

  /**
   * listIPC
   */
  private listIPC() {
    // 渲染进程没有buffer
    ipcMain.on(IPC_CHANNELS.SCREENSHOT.END_CAPTURE, (e, {buffer: arrayBuffer}) => {
      const buffer = Buffer.from(arrayBuffer)
      clipboard.writeImage(nativeImage.createFromBuffer(buffer))
      const filePath = path.join(app.getPath('pictures'), `screenshot-${Date.now()}.png`)
      fs.writeFileSync(filePath, buffer)
      console.log('截图已保存到', filePath)
    })
  }
}