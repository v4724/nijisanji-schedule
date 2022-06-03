import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() { }

  show(success?: boolean): void {
    if (success) {
      this.message$.next('Success!')
    } else {
      this.message$.next('Fail!')
    }
    this.show$.next(true)
    setTimeout(() => this.show$.next(false), 2000)
  }
}
