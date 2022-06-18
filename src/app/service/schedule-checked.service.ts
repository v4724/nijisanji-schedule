import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs'
import {
  AngularFirestore
} from '@angular/fire/compat/firestore'
import { sortByDefaultStreamer } from '@app/model/model'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamDto } from '@app/model/dto/StreamDto'
import { ScheduleCheckedItemVo } from '@app/model/vo/ScheduleCheckedItemVo'
import { ScheduleCheckedItemDto, toScheduleCheckedData } from '@app/model/dto/ScheduleCheckedItemDto'

@Injectable({
  providedIn: 'root'
})
export class ScheduleCheckedService {

  lastUpdateTimestamp$: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  scheduleCheckedList$: BehaviorSubject<Array<ScheduleCheckedItemVo>> = new BehaviorSubject<Array<ScheduleCheckedItemVo>>([])
  items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private streamerInfoService: StreamerInfoService
  ) {
    // Initialize Firebase
    this.items = db.collection('scheduleChecked').valueChanges({ idField: 'id' });
    this.items.subscribe((result) => {
      const data = toScheduleCheckedData(result, streamerInfoService)
      sortByDefaultStreamer<ScheduleCheckedItemVo>(data, 'streamer', streamerInfoService)

      this.updateLastUpdateTimestamp(data)
      this.scheduleCheckedList$.next(data)
    })
  }

  private updateLastUpdateTimestamp(items: Array<ScheduleCheckedItemVo>): void {
    let lastUpdateTimestamp = this.lastUpdateTimestamp$.getValue()
    items.forEach((item) => {
      const updateTimestamp = item.updatedTimestamp
      if (updateTimestamp > lastUpdateTimestamp) {
        lastUpdateTimestamp = updateTimestamp
      }
    })

    this.lastUpdateTimestamp$.next(lastUpdateTimestamp)
  }

  public updateScheduleChecked (id: string, data: ScheduleCheckedItemDto): Promise<void> {
    return this.db.collection<StreamDto>('scheduleChecked')
               .doc(id)
               .update(data)
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }
}
