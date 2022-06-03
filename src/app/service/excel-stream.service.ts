import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone'
import * as XLSX from 'xlsx'
import { Subject } from 'rxjs'
import { Stream, TBDStream } from '@app/feature/schedule/data/Stream'
import { FirebaseService } from '@app/service/firebase.service'
import { initStream, Stream as FirebaseStream, StreamDto, toDto } from '@app/feature/schedule/test/dto/Stream'

@Injectable({
  providedIn: 'root'
})
export class ExcelStreamService {

  origData$ = new Subject<Array<Stream>>();
  origTBDData$ = new Subject<Array<TBDStream>>();

  errorList: Array<string>=[]
  constructor(private firebaseService: FirebaseService) {

    this.origData$.subscribe((streams) => {
      const map = new Map<number, FirebaseStream>()
      streams.forEach((stream) => {
        const id = stream.id as number
        const guestId = stream.guestId
        if (guestId) {
          const firebaseStream = map.get(guestId)
          if (firebaseStream) {
            firebaseStream.featStreamers.push(stream.streamer)
          } else {
            console.log('missing id streamer guestId', id, stream.streamer, guestId)
          }
        } else {
          const firebaseStream: FirebaseStream = initStream()
          firebaseStream.streamer = stream.streamer
          firebaseStream.isCanceled = stream.isCanceled ?? false
          firebaseStream.isModified = stream.isModified ?? false
          firebaseStream.isUncertain = stream.isUncertain ?? false
          firebaseStream.timestamp = stream.timestamp ? Math.round(stream.timestamp) : stream.timestamp
          firebaseStream.link = stream.link ?? ''
          firebaseStream.onSchedule = stream.onSchedule ?? false
          firebaseStream.title = stream.title

          map.set(id, firebaseStream)
        }
      })

      map.forEach((value, key) => {
        const dto = toDto(value)
        this.firebaseService.add(dto)
            .then(() => {
        }).catch((err) => {
          console.error(err)
          console.log(`add to firebase error ${dto.streamer}: ${dto.title}`)
        })
      })
    })
  }

  readFromExcel(): void {
    const url = `assets/docs/Schedule.xlsx?${moment()}`;
    fetch(url)
      .then((result) => {
        result.arrayBuffer()
           .then((data) => {

             /* data is an ArrayBuffer */
             const workbook = XLSX.read(data);
             workbook.SheetNames.forEach((sheetName: string) => {
               if (sheetName === 'ALL') {
                 this.origData$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
               } else if (sheetName === 'TBD') {
                 this.origTBDData$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]))
               }

             })
           })
      });
  }
}
