import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { StreamAnchor } from '@app/model/vo/ScheduleTemplate/StreamAnchor'

export class TemplateAnchor {
  version = '1'
  defaultMonth: BoundingBox;
  defaultStartDate: BoundingBox;
  streamAnchors: Array<StreamAnchor>;

  constructor () {
    this.defaultMonth = new BoundingBox()
    this.defaultStartDate = new BoundingBox()
    this.streamAnchors = []
    let days = 7
    while(days > 0) {
      this.streamAnchors.push(new StreamAnchor())
      days -= 1
    }
  }
}

