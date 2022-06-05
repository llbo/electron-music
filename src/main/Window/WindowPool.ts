import { WindowPoolItem } from './WindowPoolItem'
import { eventer } from '../../common/eventer'
import { WindowParam } from '../../common/WindowParam'

export class WindowPool {
  items: WindowPoolItem[] = []
  init() {
    for (let i = 0; i < 3; i++) {
      this.items.push(new WindowPoolItem())
    }
    eventer.on('loadWindow', (e, data) => {
      if (this.isWindowInUse(data)) return
      this.picAndUse(data)
    })
  }
  private isWindowInUse(param: WindowParam) {
    const item = this.items.find((v) => v.param?.url === param.url)
    if (!item) return false
    item?.effectParam(param)
    return true
  }
  private picAndUse(param: WindowParam) {
    const item = this.items.find((v) => !v.param)
    item!.use(param)
    this.items.push(new WindowPoolItem())
  }
}
