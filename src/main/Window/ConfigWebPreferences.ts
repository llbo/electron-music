import { WebPreferences } from 'electron'
/**
 * WebPreferences配置类，提供默认参数
 */

export class ConfigWebPreferences implements WebPreferences {
  nodeIntegration?: boolean | undefined = true
  devTools: boolean | undefined = true
  webSecurity: boolean | undefined = false
  nodeIntegrationInSubFrames: boolean | undefined = true
  nodeIntegrationInWorker: boolean | undefined = true
  worldSafeExecuteJavaScript: boolean | undefined = true
  contextIsolation?: boolean | undefined = false
  allowRunningInsecureContent?: boolean | undefined = true
  disableHtmlFullscreenWindowResize?: boolean | undefined = true
  enableWebSQL?: boolean | undefined = false
  spellcheck?: boolean | undefined = false
  center = true
  webgl = false
}
