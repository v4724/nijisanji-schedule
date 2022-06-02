import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore'
// import { Stream } from '@app/feature/schedule/data/Stream'
import {
  fromDto,
  getFeatStream,
  Stream as FirebaseStream,
  Stream,
  StreamDto, toStreamData
} from '@app/feature/schedule/test/dto/Stream'
import { delay, flatMap, map } from 'rxjs/internal/operators'
import * as lodash from 'lodash'
import { FirebaseStreamViewItem } from '@app/feature/schedule/type'
import { debounceTime } from 'rxjs/operators'

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
                  delay(500),
                  map((snapshot:QuerySnapshot<any>) => {
                    const origData = snapshot.docs
                    const data: Array<Stream> = toStreamData(origData)
                    return data
                  })
                )
  }
}
