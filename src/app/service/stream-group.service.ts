import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { distinctArray } from '@app/feature/schedule/utils'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { cloneDeep } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class StreamGroupService {

  group$ = new BehaviorSubject<Array<string>>([])
  selectedGroup$ = new BehaviorSubject<Array<string>>([])
  groupOrderChanged$ = new BehaviorSubject<Array<string>>([])

  constructor(private streamerInfoService: StreamerInfoService,
  ) {
    streamerInfoService.streamerInfos$.subscribe((infos) => {
      const groups = distinctArray(infos.map(info => info.group))

      const groupsLen = this.group$.getValue().length
      const selectedGroupsLen = this.selectedGroup$.getValue().length
      if (groupsLen === 0 && selectedGroupsLen === 0) {
        this.selectedGroup$.next(cloneDeep(groups))
      }

      const orderedGroupList = this.groupOrderChanged$.getValue()
      const orderedGroups = groups.sort((a: any, b: any) => {
        const groupOrder1 = orderedGroupList.indexOf(a)
        const groupOrder2 = orderedGroupList.indexOf(b)

        if (groupOrder1 > -1 && groupOrder2 > -1) {
          return groupOrder1 - groupOrder2
        }

        return 0
      })
      this.group$.next(orderedGroups)
    })

    const streamerGroupOrderTmp = localStorage.getItem('streamerGroupOrderList')
    const streamerGroupOrder = JSON.parse(streamerGroupOrderTmp as string) as string[] ?? []
    this.groupOrderChanged$.next(streamerGroupOrder)
  }
}
