import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'

export class SingleStreamAnchor {
  time: BoundingBox;
  hourSystem: BoundingBox;
  title: BoundingBox;

  constructor () {
    this.time = new BoundingBox()
    this.hourSystem = new BoundingBox()
    this.title = new BoundingBox()
  }

}
