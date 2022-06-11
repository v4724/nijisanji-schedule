import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'

export function sortByDefaultStreamer<T> (list: Array<T>, sortProp: string, service: StreamerInfoService): void{
  list.sort((a, b) => {
    // @ts-ignore
    const aStreamer = a[sortProp]
    // @ts-ignore
    const bStreamer = b[sortProp]

    const aStreamerInfo: StreamerInfoVo | undefined = service.findStreamerInfo(aStreamer)
    const bStreamerInfo: StreamerInfoVo | undefined = service.findStreamerInfo(bStreamer)

    const aOrder = aStreamerInfo?.order ?? 0
    const bOrder = bStreamerInfo?.order ?? 0

    return aOrder - bOrder
  })
}
