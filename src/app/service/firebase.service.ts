import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs'
import {
  AngularFirestore,
  QuerySnapshot
} from '@angular/fire/compat/firestore'
import {
  Stream,
  StreamDto, toStreamData
} from '@app/feature/schedule/data/firebase-stream/Stream'
import { delay, map } from 'rxjs/internal/operators'
import { SysParam } from '@app/feature/schedule/schedule-checked-list/schedule-checked-list.service'
import {
  ScheduleCheckedItem, ScheduleCheckedItemDto,
  toScheduleCheckedData
} from '@app/feature/schedule/data/firebase-stream/ScheduleCheckedItem'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  lastUpdateTimestamp$: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private streamerInfoService: StreamerInfoService) {
    // Initialize Firebase
    this.items = db.collection('streams').valueChanges();
  }

  public add (stream: StreamDto): Promise<boolean> {
    return this.db.collection('streams')
      .add(stream)
      .then(() => {
        return true;
      })
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
                 return false;
               })
  }

  public update (id: string, data: StreamDto): Promise<void> {
    return this.db.collection<StreamDto>('streams')
               .doc(id)
               .update(data)
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }

  public delete (id: string): Promise<void> {
    return this.db.collection<StreamDto>('streams')
               .doc(id)
               .delete()
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }

  public where (start: number, end: number, optional?: any): Observable<Array<Stream>> {
    return this.db.collection<Array<StreamDto>>(
      'streams',ref => {
                  const condition = ref.where('timestamp', '>=', start)
                                 .where('timestamp', '<=', end)
                  return optional && (typeof optional === 'function')
                    ? optional(condition)
                    : condition
               })
               .get()
                .pipe(
                  delay(500),
                  map((snapshot:QuerySnapshot<any>) => {
                    const origData = snapshot.docs
                    const data: Array<Stream> = toStreamData(origData)
                    this.updateLastUpdateTimestamp(data)
                    return data
                  })
                )
  }

  public getSysParam (key: string): Observable<SysParam | undefined> {
    return this.db.collection<Array<SysParam>>(
          'sysParams'
               )
               .get()
               .pipe(
                 map((snapshot:QuerySnapshot<any>) => {
                   console.log(snapshot)
                   const doc = snapshot.docs[0]
                   return doc?.exists
                     ? Object.assign({id: doc.id}, doc.data())
                     : undefined
      }))
  }

  public getScheduleCheckedList (): Observable<Array<ScheduleCheckedItem>> {
    return this.db.collection<Array<ScheduleCheckedItemDto>>(
      'scheduleChecked'
               )
               .get()
               .pipe(
                 map((snapshot:QuerySnapshot<any>) => {
                   const origData = snapshot.docs
                   const data: Array<ScheduleCheckedItem> = toScheduleCheckedData(origData, this.streamerInfoService)
                   return data
                 }))
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

  private updateLastUpdateTimestamp(streams: Array<Stream>): void {
    let lastUpdateTimestamp = this.lastUpdateTimestamp$.getValue()
    let next = false
    streams.forEach((stream) => {
      const updateTimestamp = stream.updatedTimestamp
      if (updateTimestamp > lastUpdateTimestamp) {
        lastUpdateTimestamp = updateTimestamp
        next = true
      }
    })

    if (next) {
      this.lastUpdateTimestamp$.next(lastUpdateTimestamp)
    }
  }
}
