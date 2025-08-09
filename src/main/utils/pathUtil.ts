import { app } from 'electron'

import path from 'path'
import { isDev } from './constantUtil'

export const getPreloadPath = () => {
  // app.getAppPath(): /Users/liujianhui01/liuxsen/interview/Copix
  return path.join(
    app.getAppPath(), 
    isDev() ? '.' : '..',
    'dist-electron',
    'main',
    'preload',
    'index.js'
  )
}