import { app } from 'electron'

import path from 'path'
import { isDev } from './constantUtil'

export const getPreloadPath = () => {
  console.log( app.getAppPath());
  return path.join(
    app.getAppPath(), 
    isDev() ? '.' : '..',
    'dist-electron',
    'preload.js'
  )
}