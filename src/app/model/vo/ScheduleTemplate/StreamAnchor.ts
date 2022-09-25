import { BoundingBox } from '@app/model/vo/ScheduleTemplate/BoundingBox'
import { SingleStreamAnchor } from '@app/model/vo/ScheduleTemplate/SingleStreamAnchor'

export class StreamAnchor {
  month?: BoundingBox;
  date?: BoundingBox;
  streamCounter: BoundingBox;
  singleStream: SingleStreamAnchor;
  multiStream: {
    first: SingleStreamAnchor,
    second: SingleStreamAnchor
  }

  constructor () {
    this.month = new BoundingBox()
    this.date = new BoundingBox()
    this.streamCounter = new BoundingBox()
    this.singleStream = new SingleStreamAnchor()
    this.multiStream = {
      first: new SingleStreamAnchor(),
      second: new SingleStreamAnchor()
    }
  }

  hasMonth () {
    const centroid = this.month?.centroid
    return centroid?.x !== -1 && centroid?.y !== -1
  }

  hasDate () {
    const centroid = this.month?.centroid
    return centroid?.x !== -1 && centroid?.y !== -1
  }
}
