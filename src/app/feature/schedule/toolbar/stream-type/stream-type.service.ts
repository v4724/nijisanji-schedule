import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export enum StreamType {
  Streamer,
  Guest,
  All
}

@Injectable({
  providedIn: 'root'
})
export class StreamTypeService {

  type$ = new BehaviorSubject<StreamType>(StreamType.All)

  constructor() { }
}
