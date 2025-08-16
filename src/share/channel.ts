export const IPC_CHANNELS = {
  SCREENSHOT: {
    /** 贴图 */
    PIN: 'screenshot:pin',
    /** ready */
    READY_CAPTURE: 'screenshot:ready-capture',
    /** 开始截屏 */
    START_CAPTURE: 'screenshot:start-capture',
    /** 截屏获取到图片 */
    GET_CAPTURE: 'screenshot:get-capture',
    /** 结束截屏 */
    END_CAPTURE: 'screenshot:end-capture',
    /** 取消截屏 */
    CANCEL_CAPTURE: 'screenshot:cancel-capture'
  },
  SHORT_CUT: {
    /** 注册快捷键 */
    REGISTER_SHORTCUT_SCREEN: 'shortcut:register:screen'
  }
}