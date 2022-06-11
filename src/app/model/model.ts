import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'

export function sortByDefaultStreamer<T> (list: Array<T>, sortProp: string, service: StreamerInfoService): void{
  list.sort((a, b) => {

    let aOrder: number = 0
    let bOrder: number = 0

    if ('order' in a && 'order' in b) {
      // @ts-ignore
      aOrder = a.order
      // @ts-ignore
      bOrder = b.order
    } else {
      // @ts-ignore
      const aStreamer = a[sortProp]
      // @ts-ignore
      const bStreamer = b[sortProp]

      const aStreamerInfo: StreamerInfoVo | undefined = service.findStreamerInfo(aStreamer)
      const bStreamerInfo: StreamerInfoVo | undefined = service.findStreamerInfo(bStreamer)

      aOrder = aStreamerInfo?.order ?? 0
      bOrder = bStreamerInfo?.order ?? 0
    }

    return aOrder - bOrder
  })
}
