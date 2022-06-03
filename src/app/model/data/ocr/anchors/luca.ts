import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 585, y: 191, },
    singleStream: {
      time: { x: 553, y: 191, },
      hourSystem: { x: 553, y: 191, },
      timezone: { x: 585, y: 191, },
      titleCenter: { x: 235, y: 164, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 582, y: 274, },
    singleStream: {
      time: { x: 552, y: 274, },
      hourSystem: { x: 552, y: 274, },
      timezone: { x: 582, y: 274, },
      titleCenter: { x: 235, y: 246, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 581, y: 357, },
    singleStream: {
      time: { x: 553, y: 357, },
      hourSystem: { x: 553, y: 357, },
      timezone: { x: 581, y: 357, },
      titleCenter: { x: 235, y: 320, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 583, y: 441, },
    singleStream: {
      time: { x: 554, y: 441, },
      hourSystem: { x: 554, y: 441, },
      timezone: { x: 583, y: 441, },
      titleCenter: { x: 235, y: 405, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 583, y: 524, },
    singleStream: {
      time: { x: 554, y: 524, },
      hourSystem: { x: 554, y: 524, },
      timezone: { x: 583, y: 524, },
      titleCenter: { x: 235, y: 497, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 583, y: 607, },
    singleStream: {
      time: { x: 554, y: 607, },
      hourSystem: { x: 554, y: 607, },
      timezone: { x: 583, y: 607, },
      titleCenter: { x: 235, y: 572, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  },
  {
    month: {x: 321, y: 107},
    date: { x: 357, y: 107, },
    streamCountPoint: { x: 583, y: 689, },
    singleStream: {
      time: { x: 554, y: 689, },
      hourSystem: { x: 554, y: 689, },
      timezone: { x: 583, y: 689, },
      titleCenter: { x: 235, y: 662, }
    },
    multiStream: {
      first: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      },
      second: {
        time: { x: 0, y: 0, },
        hourSystem: { x: 0, y: 0, },
        timezone: { x: 0, y: 0, },
        titleCenter: { x: 0, y: 0, }
      }
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 5, horizon: 5 },
  streamCounterBoundary: { vertical: 15, horizon: 15 },
  titleBoundary: { vertical: 30, horizon: 300 },
  titleMultiBoundary: { vertical: 30, horizon: 200 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
