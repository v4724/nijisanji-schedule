import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import {
  AngularFirestore,
  DocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/compat/firestore'
import {
  fromDto,
  initStream,
  Stream,
  StreamDto, toStreamData
} from '@app/feature/schedule/test/dto/Stream'
import { delay, flatMap, map } from 'rxjs/internal/operators'

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
               .catch((err) => {
                 console.error(err)
                 return false;
               })
  }

  // public get (id: string): Observable<Stream> {
  //   return this.db.collection<Array<StreamDto>>('streams')
  //              .doc<StreamDto>(id)
  //              .get()
  //              .pipe(
  //                map((snapshot: DocumentSnapshot<StreamDto>) => {
  //                  // if (snapshot.exists) {
  //                  //   return fromDto(snapshot.id, snapshot.data)
  //                  // }
  //                  return snapshot.data
  //                })
  //              )
  // }

  public update (id: string, data: StreamDto): Promise<void> {
    return this.db.collection<StreamDto>('streams')
               .doc(id)
               .update(data)
               .catch((err) => {
                 console.error(err)
               })
  }

  public delete (id: string): Promise<void> {
    return this.db.collection<StreamDto>('streams')
               .doc(id)
               .delete()
               .catch((err) => {
                 console.error(err)
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
