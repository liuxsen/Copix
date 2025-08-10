  ``` js
  public async createWindow(display: Display):Promise<void> {
    if (!this.$win || this.$win?.isDestroyed?.()) {
      const isDevMode = isDev()
      const windowTypes: Record<string, string | undefined> = {
        darwin: 'panel',
        // linux 必须设置为 undefined，否则会在部分系统上不能触发focus 事件
        // https://github.com/nashaofu/screenshots/issues/203#issuecomment-1518923486
        linux: undefined,
        win32: 'toolbar',
      };
      this.$win = new BrowserWindow({
        title: 'screenshots',
        x: display.x,
        y: display.y,
        width: display.width,
        height: display.height,
        useContentSize: true,
        type: windowTypes[process.platform],
        frame: isDevMode ? true : false,
        show: false,
        autoHideMenuBar: true,
        transparent: isDevMode ? false : true,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        // focusable 必须设置为 true, 否则窗口不能及时响应esc按键，输入框也不能输入
        focusable: true,
        skipTaskbar: true,
        alwaysOnTop: true,
        /**
         * linux 下必须设置为false，否则不能全屏显示在最上层
         * mac 下设置为false，否则可能会导致程序坞不恢复问题，且与 kiosk 模式冲突
         */
        fullscreen: false,
        // mac fullscreenable 设置为 true 会导致应用崩溃
        fullscreenable: false,
        kiosk: isDevMode ? false : true,
        backgroundColor: isDevMode ? '#fff' : '#00000000',
        titleBarStyle: 'hidden',
        hasShadow: false,
        paintWhenInitiallyHidden: false,
        // mac 特有的属性
        roundedCorners: false,
        enableLargerThanScreen: false,
        acceptFirstMouse: true,
        webPreferences: {
          devTools: isDevMode ? true : false
        }
      });

      this.$win.on('show', () => {
        this.$win?.focus();
        this.$win?.setKiosk(true);
      });

      this.$win.on('closed', () => {
        this.$win = null;
      });

      // 设置view
      this.$win.setBrowserView(this.$view);

      // 适定平台
      if (process.platform === 'darwin') {
        // mac不显示左上角的关闭放大缩小按钮
        this.$win.setWindowButtonVisibility(false);
      }

      if (process.platform !== 'win32') {
        // 截图窗口在 Mac / Linux 上始终可见，即使切换桌面或进入全屏应用，也不会被隐藏。
        this.$win.setVisibleOnAllWorkspaces(true, {
          visibleOnFullScreen: true,
          skipTransformProcessType: true,
        });
      }

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
  ```