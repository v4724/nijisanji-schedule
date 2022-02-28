import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { StreamerGroup } from '@app/feature/schedule/data/StreamerGroups'

@Injectable({
  providedIn: 'root'
})
export class StreamGroupService {

  group$ = new BehaviorSubject<Array<StreamerGroup>>([StreamerGroup.Luxiem, StreamerGroup.Ethyria, StreamerGroup.LazuLight, StreamerGroup.Noctyx, StreamerGroup.OBSYDIA])

  constructor() { }
}
