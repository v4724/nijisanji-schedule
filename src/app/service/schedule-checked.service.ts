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
import { getDto } from '@app/model/dto/UpdatedRecordDto'
import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import { getAddMemberMessage, getUpdatedScheduleMessage } from '@app/model/vo/UpdatedRecordVo'
import { UpdatedRecordService } from '@app/service/updated-record.service'

@Injectable({
  providedIn: 'root'
})
export class ScheduleCheckedService {

  scheduleCheckedList$: BehaviorSubject<Array<ScheduleCheckedItemVo>> = new BehaviorSubject<Array<ScheduleCheckedItemVo>>([])
  items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private streamerInfoService: StreamerInfoService,
              private updateBellService: UpdatedRecordService
  ) {
    // Initialize Firebase
    this.items = db.collection('scheduleChecked').valueChanges({ idField: 'id' });
    this.items.subscribe((result) => {
      const data = toScheduleCheckedData(result, streamerInfoService)
      sortByDefaultStreamer<ScheduleCheckedItemVo>(data, 'streamer', streamerInfoService)

      this.scheduleCheckedList$.next(data)
    })
  }

  public updateScheduleChecked (id: string, data: ScheduleCheckedItemDto): Promise<void> {
    return this.db.collection<StreamDto>('scheduleChecked')
               .doc(id)
               .update(data)
               .then(() => {

                 this.updateBellService.addUpdatedSchedule(data)

               })
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }
}
