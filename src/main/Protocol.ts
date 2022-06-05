import { protocol as schema, BrowserWindow, session } from 'electron'
import * as path from 'path'
import fs from 'fs'
import { URL } from 'url'
import os from 'os'
import { fileType } from '../common/fileType'

export class Protocol {
  /**
   * 注册应用内协议
   * @param request 请求对象
   * @param respond 响应对象
   */
  private regDefaultProtocol(request: any, respond: any) {
    let pathName = new URL(request.url).pathname
    pathName = decodeURI(pathName)
    const filePath = path.join(__dirname, pathName)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log('Protocol load file error', err)
        return
      }
      const mime = fileType.getMimeType(path.extname(pathName).toLowerCase())
      respond({ mimeType: mime, data })
    })
  }
  /**
   * 根据不同的环境获取页面内地址的绝对路径
   * @param url 相对页内地址
   * @returns 绝对页内地址
   */
  private getTotalUrl(url: string) {
    if (process.env.ENV_NOW === 'dev') {
      return `http://localhost:${process.env.WEB_PORT}/#${url}`
    } else if (process.env.ENV_NOW === 'test') {
      return `hiktest://./index.html/#${url}`
    } else {
      return `hik://./index.html/#${url}`
    }
  }
  /**
   * 让指定窗口加载一个应用内页面
   *
   * @param win 窗口对象
   * @param url 页面地址
   */
  load(win: BrowserWindow, url: string) {
    const totalUrl = this.getTotalUrl(url)
    console.log('totalUrl', totalUrl)
    win.webContents.loadURL(totalUrl)
  }
  /**
   * 让指定窗口加载一个外部页面
   * @param win 窗口对象
   * @param url 页面地址
   */
  loadTotalUrl(win: BrowserWindow, url: string) {
    win.webContents.loadURL(url)
  }
  /**
   * 应用内协议类的初始化
   */
  init() {
    const schemaName = process.env.ENV_NOW === 'test' ? 'hiktest' : 'hik'
    schema.registerBufferProtocol(schemaName, (request, respond) =>
      this.regDefaultProtocol(request, respond)
    )
    session.defaultSession.setUserAgent(
      `name: HikLinkPc; platform:${os.platform()};arch:${os.arch()};user:${
        os.userInfo().username
      }`
    )
  }
}
