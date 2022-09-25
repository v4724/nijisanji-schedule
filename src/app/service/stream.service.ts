import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/observable'
import {
  AngularFirestore,
  QuerySnapshot
} from '@angular/fire/compat/firestore'
import {
  StreamVo
} from '@app/model/vo/StreamVo'
import { delay, map } from 'rxjs/internal/operators'
import { SysParam } from '@app/feature/schedule/schedule-checked-list/schedule-checked-list.service'
import { StreamDto, toStreamData } from '@app/model/dto/StreamDto'
import { UpdatedRecordService } from '@app/service/updated-record.service'

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private updateBellService: UpdatedRecordService) {
    // Initialize Firebase
    this.items = db.collection('streams').valueChanges();
  }

  public add (stream: StreamDto): Promise<boolean> {
    return this.db.collection('streams')
      .add(stream)
      .then(() => {
        this.updateBellService.addUnScheduledStream(stream)
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
               .then(() => {

                 this.updateBellService.addUpdatedStream(data)

               })
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

  public where (start: number, end: number, optional?: any): Observable<Array<StreamVo>> {
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
                    const data: Array<StreamVo> = toStreamData(origData)
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
                   const doc = snapshot.docs[0]
                   return doc?.exists
                     ? Object.assign({id: doc.id}, doc.data())
                     : undefined
      }))
  }
}
