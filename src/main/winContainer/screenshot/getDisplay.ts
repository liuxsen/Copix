import { screen, type Rectangle } from 'electron';

export interface Display extends Rectangle {
  id: number
  scaleFactor: number
}

export const getDisplay = ():Display => {
  // 获取鼠标的坐标
  const point = screen.getCursorScreenPoint()
  // 获取鼠标对应的display
  const { id, bounds, scaleFactor } = screen.getDisplayNearestPoint(point)
  return {
    id,
    scaleFactor,
    x: Math.floor(bounds.x),
    y: Math.floor(bounds.y),
    width: Math.floor(bounds.width),
    height: Math.floor(bounds.height),
  }
}