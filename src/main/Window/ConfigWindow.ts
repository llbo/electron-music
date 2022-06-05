import { BrowserWindowConstructorOptions } from 'electron'
import { ConfigWebPreferences } from './ConfigWebPreferences'

/**
 * 窗口配置类，提供默认参数
 */

export class ConfigWindow implements BrowserWindowConstructorOptions {
  width?: number
  height?: number
  maximizable = true
  resizable = true
  center = true
  x?: number
  y?: number
  alwaysOnTop?: boolean
  akipTaskbar?: boolean
  frame = false
  show = false
  WebPreferences = new ConfigWebPreferences()
  nodeIntegrationInSubFrames = true
  nativeWindowOpen = true
  momodalable = false
  parent?: any
  movable = true
  thickFrame = true
  minHeight?: number
  minWidth?: number
}
