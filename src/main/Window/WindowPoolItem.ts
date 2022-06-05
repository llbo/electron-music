import { BrowserWindow } from 'electron'
import { entry } from '../Entry'
import { ConfigWindow } from './ConfigWindow'
import { eventer } from '../../common/eventer'
import { WindowParam } from '../../common/WindowParam'

export class WindowPoolItem {
  win: BrowserWindow
  param?: WindowParam
  private initEvent() {
    this.win.on('close', () => {
      for (let i = 0; i < entry.windowPool.items.length; i++) {
        if (entry.windowPool.items[i].param?.url === this.param?.url) {
          entry.windowPool.items.splice(i, 1)
        }
        if (this.param?.isModal) {
          BrowserWindow.getAllWindows().forEach((w) => {
            eventer.emitToWebContents(w.webContents, 'showMask', {
              flag: false
            })
          })
        }
      }
    })
    // entry.commonWindowEvent.windowMaximizeChange(this.win)
  }
  private controlSize() {
    if (this.param?.resizable === false) {
      this.win.setResizable(false)
      return
    } else if (this.param?.minSize) {
      this.win.setMinimumSize(
        this.param.minSize.width,
        this.param.minSize.height
      )
      this.win.setResizable(true)
      return
    }
    this.win.setResizable(true)
    this.win.setMinimumSize(200, 150)
  }
  private modalSet() {
    this.win.setSkipTaskbar(true)
    this.win.setParentWindow(entry.mainWindow)
    BrowserWindow.getAllWindows().forEach((w) => {
      if (w.id !== this.win.id)
        eventer.emitToWebContents(w.webContents, 'showMask', { flag: true })
    })
  }
  effectParam(param: WindowParam) {
    this.param = param
    this.win.setSize(this.param!.size.width, this.param!.size.height)
    this.win.setAlwaysOnTop(this.param!.alwaysTop || false)
    if (this.param!.position) {
      this.win.setPosition(this.param!.position.x, this.param!.position.y)
    } else {
      this.win.center()
    }
    if (this.param?.isModal) this.modalSet()
    this.controlSize()
    this.win.moveTop()
    this.win.show()
  }
  public use(param: WindowParam) {
    this.effectParam(param)
    entry.protocol.load(this.win, param.url)
  }
  constructor() {
    const config = new ConfigWindow()
    this.win = new BrowserWindow(config)
    this.initEvent()
    entry.protocol.load(this.win, '/blank')
  }
}
