/**
 * 文件类型处理类
 */

class FileType {
  /**
   * 根据文件minmeType获取文件的类型
   * @param mimeType
   * @returns 文件类型
   */
  getFileType(mimeType: string): string {
    if (mimeType.startsWith('image')) {
      return 'image'
    } else if (mimeType.endsWith('.sheet')) {
      return 'excel'
    } else {
      return 'qitawenjian'
    }
  }
  /**
   * @param extName 文件拓展名
   */
  getMimeType(extName: string): string {
    extName = extName.substring(1)
    if (['html', 'htm', 'shtml'].includes(extName)) {
      return 'text/html'
    } else if (extName === 'css') {
      return 'text/css'
    } else if (extName === 'js') {
      return 'application/javascript'
    } else if (['jpeg', 'jpg'].includes(extName)) {
      return 'image/jpeg'
    } else if (extName === 'png') {
      return 'image/png'
    } else if (extName === 'webp') {
      return 'image/webp'
    } else if (extName === 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (extName === 'xlsx') {
      return 'application/vnd.openxlformats-officedocument.spreadsheetml.sheet'
    } else if (extName === 'pptx') {
      return 'application/vnd.openxlformats-officedocument.presentationml.presentation'
    } else if (extName === 'doc') {
      return 'application/msword'
    } else if (extName === 'xls') {
      return 'application/vnd.ms-excel'
    } else if (extName === 'ppt') {
      return 'application/vnd.ms-powerpoint'
    } else if (extName === 'pdf') {
      return 'application/pdf'
    } else if (extName === 'json') {
      return 'application/json'
    } else if (extName === 'wasm') {
      return 'application/wasm'
    } else if (extName === 'mp4') {
      return 'video/mp4'
    } else if (extName === '7z') {
      return 'application/x-7z-compressed'
    } else if (extName === 'zip') {
      return 'application/zip'
    } else if (
      [
        'bin',
        'exe',
        'dll',
        'deb',
        'dmg',
        'iso',
        'img',
        'msi',
        'msp',
        'msm'
      ].includes(extName)
    ) {
      return 'application/octet-stream'
    } else {
      return 'text/plain'
    }
  }
}

export const fileType = new FileType()
