import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore'
import { delay, map, tap } from 'rxjs/internal/operators'
import { StreamerInfoDto, toStreamerInfoData } from '@app/model/dto/StreamerInfoDto'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { sortByDefaultStreamer } from '@app/model/model'
import { distinctArray } from '@app/feature/schedule/utils'
import { StreamGroupService } from '@app/service/stream-group.service'
import { StreamDto } from '@app/model/dto/StreamDto'
import { UpdatedRecordService } from '@app/service/updated-record.service'
import { getDto } from '@app/model/dto/UpdatedRecordDto'
import { UpdatedRecordType } from '@app/model/enum/UpdatedRecordType'
import { getAddMemberMessage } from '@app/model/vo/UpdatedRecordVo'
import { VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { toVoiceButtonInfoData, VoiceButtonInfoDto } from '@app/model/dto/VoiceButtonInfoDto'

@Injectable({
  providedIn: 'root'
})
export class VoiceButtonInfoService {

  voiceButtonInfos: Map<string, Array<VoiceButtonInfoVo>> = new Map<string, Array<VoiceButtonInfoVo>>()

  constructor(private db: AngularFirestore,
              private updateBellService: UpdatedRecordService,
              private loader: RainbowLoaderService) {
  }

  public getByStreamer (streamer: string, force: boolean): Observable<Array<VoiceButtonInfoVo>> {
    if (force) {
      return this.get(streamer)
                 .pipe(
                   tap((result) => {
                     this.voiceButtonInfos.set(streamer, result)
                   })
                 )
    } else {
      const infos = this.voiceButtonInfos
      if (infos.has(streamer)) {
        const ob = new Observable<Array<VoiceButtonInfoVo>>((observer) => {
          observer.next(infos.get(streamer) ?? [])
          observer.complete()
        })
        return ob
      } else {
        return this.get(streamer)
                   .pipe(
                     tap((result) => {
                       this.voiceButtonInfos.set(streamer, result)
                     })
                   )
      }
    }
  }

  public add (infoDto: VoiceButtonInfoDto): Promise<boolean> {
    this.loader.loading$.next(true)

    return this.db.collection('voiceButtonInfos')
               .add(infoDto)
               .then(() => {

                 return true;
               })
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
                 return false;
               })
      .finally(() => {
        this.loader.loading$.next(false)
      })
  }

  public update (id: string, data: VoiceButtonInfoDto): Promise<void> {
    this.loader.loading$.next(true)

    return this.db.collection<VoiceButtonInfoDto>('voiceButtonInfos')
               .doc(id)
               .update(data)
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
               .finally(() => {
                 this.loader.loading$.next(false)
               })
  }

  public delete (id: string): Promise<void> {
    return this.db.collection<StreamDto>('voiceButtonInfos')
               .doc(id)
               .delete()
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }

  private get (streamer: string): Observable<Array<VoiceButtonInfoVo>> {
    this.loader.loading$.next(true)

    return this.db.collection<Array<VoiceButtonInfoVo>>(
      'voiceButtonInfos', ref => ref.where('streamer', '==', streamer))
               .get()
                .pipe(
                  delay(500),
                  map((snapshot:QuerySnapshot<any>) => {
                    const origData = snapshot.docs
                    let data: Array<VoiceButtonInfoVo> = toVoiceButtonInfoData(origData)
                    return data
                  }),
                  tap(() => {
                    this.loader.loading$.next(false)
                  })
                )
  }


}
