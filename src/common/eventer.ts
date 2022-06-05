import { WebContents } from 'electron'
import events from 'events'
import { ipcRenderer, ipcMain, webContents } from 'electron'

class Eventer {
  private instance: NodeJS.EventEmitter

  emitInProcess(eventName: string, eventArgs?: any) {
    this.instance.emit(eventName, eventArgs)
  }
  emitCrossProcess(eventName: string, eventArgs?: any) {
    if (ipcMain) {
      webContents.getAllWebContents().forEach((wc) => {
        wc.send('__eventPipe', { eventName, eventArgs })
      })
    } else if (ipcRenderer) {
      ipcRenderer.invoke('__eventPipe', { eventName, eventArgs })
    }
  }
  emitToAllProcess(eventName: string, eventArgs?: any) {
    this.instance.emit(eventName, eventArgs)
    if (ipcMain) {
      webContents.getAllWebContents().forEach((wc) => {
        wc.send('___eventPipe', { eventName, eventArgs })
      })
    } else if (ipcRenderer) {
      ipcRenderer.invoke('__eventPipe', {
        eventName,
        eventArgs,
        broadcast: true
      })
    }
  }
  emitToWebContents(
    wcIdOrWc: number | WebContents,
    eventName: string,
    eventArgs?: any
  ) {
    if (ipcMain) {
      if (typeof wcIdOrWc == 'number') {
        webContents.getAllWebContents().forEach((wc) => {
          if (wc.id === wcIdOrWc)
            wc.send('__eventPipe', { eventName, eventArgs })
        })
      } else {
        wcIdOrWc.send('__eventPipe', { eventName, eventArgs })
      }
    } else if (ipcRenderer) {
      ipcRenderer.sendTo(wcIdOrWc as number, '___eventPipe', {
        eventName,
        eventArgs
      })
    }
  }
  on(eventName: string, callBack: (e: any, eventArgs: any) => void) {
    this.instance.on(eventName, callBack)
  }
  once(eventName: string, callBack: (e: any, eventArgs: any) => void) {
    this.instance.once(eventName, callBack)
  }
  off(eventName: string, callBack: (e: any, eventArgs: any) => void) {
    if (callBack) {
      this.instance.removeListener(eventName, callBack)
    } else {
      this.instance.removeAllListeners(eventName)
    }
  }
  private initEventPipe() {
    if (ipcRenderer) {
      ipcRenderer.on(
        '__eventPipe',
        (e: Electron.IpcRendererEvent, { eventName, eventArgs }) => {
          this.instance.emit(eventName, e, eventArgs)
        }
      )
    } else if (ipcMain) {
      ipcMain.handle(
        '__eventPipe',
        (
          e: Electron.IpcMainInvokeEvent,
          { eventName, eventArgs, broadcast }
        ) => {
          this.instance.emit(eventName, e, eventArgs)
          if (!broadcast) return
          webContents.getAllWebContents().forEach((wc) => {
            if (wc.id !== e.sender.id) {
              wc.send('__eventPipe', { eventName, eventArgs })
            }
          })
        }
      )
    }
  }
  constructor() {
    this.instance = new events.EventEmitter()
    this.initEventPipe()
  }
}

export const eventer = new Eventer()
