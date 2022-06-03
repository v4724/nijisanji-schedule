import { Injectable } from '@angular/core'
import { getDto, UpdatedRecordDto } from '@app/model/dto/UpdatedRecordDto'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ScheduleCheckedItemDto } from '@app/model/dto/ScheduleCheckedItemDto'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import {
  getAddMemberMessage, getUnScheduledStreamMessage,
  getUpdatedScheduleMessage,
  getUpdatedStreamMessage,
  UpdatedRecordVo
} from '@app/model/vo/UpdatedRecordVo'
import { StreamDto } from '@app/model/dto/StreamDto'
import { StreamerInfoDto } from '@app/model/dto/StreamerInfoDto'
import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { tap } from 'rxjs/internal/operators'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Injectable({
  providedIn: 'root'
})
export class UpdatedRecordService {

  updatedBellList$: BehaviorSubject<Array<UpdatedRecordVo>> = new BehaviorSubject<Array<UpdatedRecordVo>>([])
  updated$: Subject<boolean> = new Subject<boolean>()

  items: Observable<any[]>

  init = true

  constructor(private db: AngularFirestore,
              private loader: RainbowLoaderService,
              private streamerInfoService: StreamerInfoService
  ) {

    this.items = this.db.collection('updatedRecords', ref=> {
      return ref.orderBy('timestamp', 'desc')
                .limit(100)
    }).valueChanges({ idField: 'id' });

    this.loader.loading$.next(true)
    this.items
      .pipe(
        tap((result) => {
          result.forEach((vo) => {
            if (vo.streamer) {
              vo.streamerInfo = this.streamerInfoService.findStreamerInfo(vo.streamer)
            }
          })
        })
      )
      .subscribe((result) => {
      this.loader.loading$.next(false)

      const origLength = this.updatedBellList$.getValue().length
      const newLength = result.length
      if (origLength && newLength && origLength == newLength) {
        const origId = this.updatedBellList$.getValue()[0].id
        const newId = result[0].id
        if (origId !== newId) {
          this.updated$.next(true)
        }

      } else if (origLength != newLength){
        this.updated$.next(true)
      }

      this.updatedBellList$.next(result)
    })
  }

  public addMember (data: StreamerInfoDto): void {
    this.add(getDto(data.name, UpdatedRecordType.addMember, getAddMemberMessage(data)))
  }

  public addUnScheduledStream (data: StreamDto): void {
    if (!data.onSchedule) {
      this.add(getDto(data.streamer, UpdatedRecordType.updateStream, getUnScheduledStreamMessage(data)))
    }
  }

  public addUpdatedStream (data: StreamDto): void {
    if (data.isCanceled || data.isModified) {
      this.add(getDto(data.streamer, UpdatedRecordType.updateStream, getUpdatedStreamMessage(data)))
    }
  }

  public addUpdatedSchedule (data: ScheduleCheckedItemDto): void {
    if (data.state === ScheduleCheckedState.none) {
      return
    }

    this.add(getDto(data.streamer, UpdatedRecordType.updateSchedule, getUpdatedScheduleMessage(data)))
  }

  public remove (id: string): void {
    this.db.collection('updatedRecords')
             .doc(id)
             .delete()
             .catch((err) => {
               console.error(err)
               window.alert(err)
             })
  }

  private add (infoDto: UpdatedRecordDto): void {
    this.db.collection('updatedRecords')
        .add(infoDto)
        .then(() => {
        })
        .catch((err) => {
          console.error(err)
        })
  }

}
