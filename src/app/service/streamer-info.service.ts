import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore'
import { delay, map } from 'rxjs/internal/operators'
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

@Injectable({
  providedIn: 'root'
})
export class StreamerInfoService {

  streamerInfos$: BehaviorSubject<Array<StreamerInfoVo>> = new BehaviorSubject<Array<StreamerInfoVo>>([])
  items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              // private updateBellService: UpdatedRecordService,
              private loader: RainbowLoaderService) {
    // Initialize Firebase
    this.items = db.collection('streamerInfos').valueChanges({ idField: 'id' });
    this.items.subscribe((result) => {
      sortByDefaultStreamer<StreamerInfoVo>(result, 'name', this)

      this.streamerInfos$.next(result)
    })
  }

  public findStreamerInfo(streamer: string): StreamerInfoVo | undefined {
    const streamers = this.streamerInfos$.getValue()
    return streamers.find(s => s.name === streamer)
  }

  public add (infoDto: StreamerInfoDto): Promise<boolean> {
    this.loader.loading$.next(true)

    return this.db.collection('streamerInfos')
               .add(infoDto)
               .then(() => {

                 // this.updateBellService.addMember(infoDto)

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

  public update (id: string, data: StreamerInfoDto): Promise<void> {
    this.loader.loading$.next(true)

    return this.db.collection<StreamerInfoDto>('streamerInfos')
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
    return this.db.collection<StreamDto>('streamerInfos')
               .doc(id)
               .delete()
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }


  public load(): void {

    // this.loader.loading$.next(true)
    // this.get().subscribe((data) => {
    //   this.streamerInfos$.next(data)
    //   this.loader.loading$.next(false)
    // })

  }

  private get (): Observable<Array<StreamerInfoVo>> {
    this.loader.loading$.next(true)

    return this.db.collection<Array<StreamerInfoDto>>(
      'streamerInfos')
               .get()
                .pipe(
                  delay(500),
                  map((snapshot:QuerySnapshot<any>) => {
                    const origData = snapshot.docs
                    let data: Array<StreamerInfoVo> = toStreamerInfoData(origData)
                    sortByDefaultStreamer<StreamerInfoVo>(data, 'name', this)
                    return data
                  })
                )
  }


}
