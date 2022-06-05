/**
 * 使用窗口池创建窗口的参数类
 */

export class WindowParam {
  /**
   * 窗口页面地址
   */
  url = '/blank'
  /**
   * 是否永远显示在最前面
   */
  alwaysTop?: boolean
  /**
   * 是否为模态窗口
   */
  isModal?: boolean
  size = {
    width: 800,
    height: 600
  }
  /**
   * 窗口的最小值
   */
  minSize?: {
    width: number
    height: number
  }
  /**
   * 窗口默认可以调整大小
   */
  resizable = true
  /**
   * 窗口的位置
   */
  position?: {
    x: number
    y: number
  }
}
