import { Injectable } from '@angular/core'
import { getDto, UpdatedInfoDto } from '@app/model/dto/UpdatedInfoDto'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ScheduleCheckedItemDto } from '@app/model/dto/ScheduleCheckedItemDto'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import {
  getAddMemberMessage,
  getUpdatedScheduleMessage,
  getUpdatedStreamMessage,
  UpdatedInfoVo
} from '@app/model/vo/UpdatedInfoVo'
import { StreamDto } from '@app/model/dto/StreamDto'
import { StreamerInfoDto } from '@app/model/dto/StreamerInfoDto'
import { UpdatedInfoType } from '@app/model/enum/UpdatedInfoType'
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'

@Injectable({
  providedIn: 'root'
})
export class UpdatedInfoService {

  updatedBellList$: BehaviorSubject<Array<UpdatedInfoVo>> = new BehaviorSubject<Array<UpdatedInfoVo>>([])
  updated$: Subject<boolean> = new Subject<boolean>()

  items: Observable<any[]>

  init = true

  constructor(private db: AngularFirestore,
              private loader: RainbowLoaderService
  ) {

    this.items = this.db.collection('updatedInfo', ref=> {
      return ref.orderBy('timestamp', 'desc')
                .limit(100)
    }).valueChanges({ idField: 'id' });

    this.loader.loading$.next(true)
    this.items.subscribe((result) => {
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
    this.add(getDto(UpdatedInfoType.addMember, getAddMemberMessage(data)))
  }

  public addUpdatedStream (data: StreamDto): void {
    if (data.isCanceled || data.isModified) {
      this.add(getDto(UpdatedInfoType.updateStream, getUpdatedStreamMessage(data)))
    }
  }

  public addUpdatedSchedule (data: ScheduleCheckedItemDto): void {
    if (data.state === ScheduleCheckedState.none) {
      return
    }

    this.add(getDto(UpdatedInfoType.updateSchedule, getUpdatedScheduleMessage(data)))
  }

  private add (infoDto: UpdatedInfoDto): void {
    this.db.collection('updatedInfo')
        .add(infoDto)
        .then(() => {
        })
        .catch((err) => {
          console.error(err)
        })
  }
}
