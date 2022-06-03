import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment-timezone'
import { getTimezoneOptions, Option } from '@app/model/enum/Timezone'

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  timezone$ = new BehaviorSubject<string>(moment.tz.guess())

  _timezones: Array<Option> = []

  constructor() {

    const origTz = moment.tz.guess()
    this._timezones = getTimezoneOptions()
    this._timezones.splice(0, 0, {
      text: 'LOCAL',
      value: origTz
    })

  }

  get timezones () {
    return Object.freeze(this._timezones)
  }

}
