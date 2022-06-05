import { BrowserWindow, app } from 'electron'
import { CommonWindowEvent } from './Window/CommonWindowEvent'
import { Protocol } from './Protocol'
import { ConfigWindow } from './Window/ConfigWindow'
import { WindowPool } from './Window/WindowPool'
class Entry {
  mainWindow!: BrowserWindow
  windowPool = new WindowPool()
  commonWindowEvent: CommonWindowEvent = new CommonWindowEvent()
  protocol = new Protocol()
  initMainWindow() {
    const winConfig = new ConfigWindow()
    // const winConfig = { width: 0, height: 0 }
    winConfig.width = 800
    winConfig.height = 600
    winConfig.show = true
    this.mainWindow = new BrowserWindow(winConfig)
    this.protocol.load(this.mainWindow, '/')
    // this.mainWindow.webContents.openDevTools({ mode: 'undocked' })
  }
  constructor() {
    app.on('ready', async () => {
      console.log('ready')
      this.protocol.init()
      this.commonWindowEvent.init()
      this.initMainWindow()
      this.windowPool.init()
    })
  }
}

export const entry = new Entry()
