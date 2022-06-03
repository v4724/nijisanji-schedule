import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { distinctArray } from '@app/feature/schedule/utils'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { cloneDeep } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class StreamGroupService {

  group$ = new BehaviorSubject<Array<string>>([])
  selectedGroup$ = new BehaviorSubject<Array<string>>([])

  constructor(private streamerInfoService: StreamerInfoService,
  ) {
    streamerInfoService.streamerInfos$.subscribe((infos) => {
      const groups = distinctArray(infos.map(info => info.group))

      const groupsLen = this.group$.getValue().length
      const selectedGroupsLen = this.selectedGroup$.getValue().length
      if (groupsLen === 0 && selectedGroupsLen === 0) {
        this.selectedGroup$.next(cloneDeep(groups))
      }
      this.group$.next(groups)
    })
  }
}
