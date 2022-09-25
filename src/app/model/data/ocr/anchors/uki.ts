import { ScheduleAnchor, StreamAnchor } from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    date: { x: 276, y: 79, },
    streamCountPoint: { x: 300, y: 107, },
    singleStream: {
      time: { x: 242, y: 107, },
      hourSystem: { x: 281, y: 107, },
      timezone: { x: 300, y: 107, },
      titleCenter: { x: 552, y: 109, }
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
    date: { x: 276, y: 174, },
    streamCountPoint: { x: 300, y: 201, },
    singleStream: {
      time: { x: 242, y: 201, },
      hourSystem: { x: 281, y: 201, },
      timezone: { x: 300, y: 201, },
      titleCenter: { x: 552, y: 201, }
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
    date: { x: 276, y: 266, },
    streamCountPoint: { x: 300, y: 294, },
    singleStream: {
      time: { x: 242, y: 294, },
      hourSystem: { x: 281, y: 294, },
      timezone: { x: 300, y: 294, },
      titleCenter: { x: 552, y: 294, }
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
    date: { x: 276, y: 359, },
    streamCountPoint: { x: 300, y: 390, },
    singleStream: {
      time: { x: 242, y: 390, },
      hourSystem: { x: 281, y: 390, },
      timezone: { x: 300, y: 390, },
      titleCenter: { x: 552, y: 390, }
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
    date: { x: 276, y: 453, },
    streamCountPoint: { x: 300, y: 483, },
    singleStream: {
      time: { x: 242, y: 483, },
      hourSystem: { x: 281, y: 483, },
      timezone: { x: 300, y: 483, },
      titleCenter: { x: 552, y: 483, }
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
    date: { x: 276, y: 545, },
    streamCountPoint: { x: 300, y: 574, },
    singleStream: {
      time: { x: 242, y: 575, },
      hourSystem: { x: 281, y: 575, },
      timezone: { x: 300, y: 575, },
      titleCenter: { x: 552, y: 576, }
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
    date: { x: 276, y: 639, },
    streamCountPoint: { x: 300, y: 670, },
    singleStream: {
      time: { x: 242, y: 670, },
      hourSystem: { x: 281, y: 670, },
      timezone: { x: 300, y: 670, },
      titleCenter: { x: 552, y: 670, }
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
  titleBoundary: { vertical: 30, horizon: 200 },
  titleMultiBoundary: { vertical: 30, horizon: 200 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
