import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore'
// import { Stream } from '@app/feature/schedule/data/Stream'
import { fromDto, Stream, StreamDto } from '@app/feature/schedule/test/dto/Stream'
import { flatMap, map } from 'rxjs/internal/operators'
import * as lodash from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    // Initialize Firebase
    this.items = db.collection('streams').valueChanges();
  }

  public add (stream: StreamDto): Promise<boolean> {
    return this.db.collection('streams')
      .add(stream)
      .then(() => {
        return true;
      })
  }

  public where (start: number, end: number): Observable<Array<Stream>> {
    return this.db.collection<Array<StreamDto>>(
      'streams',ref => {
                  return ref.where('timestamp', '>=', start)
                            .where('timestamp', '<=', end)
               })
               .get()
                .pipe(
                  map((snapshot:QuerySnapshot<any>) => {
                    const origData = snapshot.docs
                    const data: Array<Stream> = []
                    origData.forEach((doc) => {
                      const origItem = doc.data()
                      const item = fromDto(origItem)
                      data.push(item)

                      if (item.featStreamers.length) {
                        item.featStreamers.forEach((featStreamer) => {
                          const feat = lodash.cloneDeep(item)
                          feat.streamer = featStreamer as string
                          feat.title = `(ref:${item.streamer}) ${item.title}`
                          feat.mainStreamer = item.streamer
                        })
                      }
                    })

                    return data
                  })
                )
  }
}
