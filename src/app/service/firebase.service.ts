import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Stream } from '@app/feature/schedule/data/Stream'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    // Initialize Firebase
    this.items = db.collection('streams').valueChanges();
  }

  public add (stream: Stream): Promise<boolean> {
    return this.db.collection('streams')
      .add(stream)
      .then(() => {
        return true;
      })
  }
}
