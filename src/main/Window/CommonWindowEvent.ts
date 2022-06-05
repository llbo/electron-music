import { BrowserWindow, ipcMain } from 'electron'
import { eventer } from '../../common/eventer'

export class CommonWindowEvent {
  private getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender)
  }
  private listenEventFromWebcontents() {
    eventer.on('minimizeWindow', (e) => {
      this.getWin(e)?.minimize()
    })
    eventer.on('maxmizeWindow', (e) => {
      this.getWin(e)?.maximize()
    })
    eventer.on('unmaxmizeWindow', (e) => {
      this.getWin(e)?.unmaximize()
    })
    eventer.on('hideWindow', (e) => {
      this.getWin(e)?.hide()
    })
    eventer.on('closeWindow', (e) => {
      this.getWin(e)?.close()
    })
  }
  public windowMaximizeChange(win: BrowserWindow) {
    win.on('maximize', () => {
      eventer.emitToWebContents(win.webContents, 'windowMaximized')
    })
    win.on('unmaximize', () => {
      eventer.emitToWebContents(win.webContents, 'windowUnmaximized')
    })
  }
  public showWhenReady(win: BrowserWindow) {
    win.once('ready-to-show', () => {
      win.show()
    })
  }
  public hookWindowProperty() {
    ipcMain.handle('resizable', (e) => {
      return this.getWin(e)?.isResizable()
    })
  }
  init() {
    this.listenEventFromWebcontents()
    this.hookWindowProperty()
  }
}
