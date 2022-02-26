import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment-timezone'

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  timezone$ = new BehaviorSubject<string>(moment.tz.guess())

  constructor() { }
}
