import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RainbowLoaderService {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  set(loading: boolean) :void {
    this.loading$.next(loading)
  }
}
