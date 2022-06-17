import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StreamGroupService {

  group$ = new BehaviorSubject<Array<string>>([])
  selectedGroup$ = new BehaviorSubject<Array<string>>([])

  constructor() { }
}
