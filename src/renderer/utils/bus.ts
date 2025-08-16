import mitt from 'mitt'

export const BUS_CHANNEL = {
  'AREAPICK': { // 选区事件
    /** 开始选区 */
    'START_AREA': 'START_AREA',
    /** 正在选取 */
    'ING_AREA': 'ING_AREA',
    /** 结束选取 */
    'END_AREA': 'END_AREA',
    /** 开始拖动 */
    'MOVING_START_AREA': 'MOVING_START_AREA',
    /** 正在拖动 */
    'MOVING_AREA': 'MOVING_AREA',
    /** 结束拖动 */
    'MOVING_END_AREA': 'MOVING_END_AREA',
    /** 开始放大缩小 */
    'RESIZE_START_AREA': 'RESIZE_START_AREA',
    /** 放大缩小 */
    'RESIZE_AREA': 'RESIZE_AREA',
    /** 结束放大缩小 */
    'RESIZE_END_AREA': 'RESIZE_END_AREA',
  }
}

export const bus = mitt()