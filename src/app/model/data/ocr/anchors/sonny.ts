import { ScheduleAnchor, StreamAnchor } from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: { x: 461, y: 141, },
    date: { x: 507, y: 141, },
    streamCountPoint: { x: 888, y: 139, },
    singleStream: {
      time: { x: 629, y: 141, },
      hourSystem: { x: 629, y: 141, },
      timezone: { x: 642, y: 141, },
      titleCenter: { x: 883, y: 103, }
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
    month: { x: 468, y: 232, },
    date: { x: 516, y: 232, },
    streamCountPoint: { x: 900, y: 230, },
    singleStream: {
      time: { x: 635, y: 228, },
      hourSystem: { x: 635, y: 228, },
      timezone: { x: 681, y: 228, },
      titleCenter: { x: 900, y: 187, }
    },
    multiStream: {
      first: {
        time: { x: 635, y: 228, },
        hourSystem: { x: 635, y: 228, },
        timezone: { x: 681, y: 228, },
        titleCenter: { x: 770, y: 187, }
      },
      second: {
        time: { x: 992, y: 232, },
        hourSystem: { x: 992, y: 232, },
        timezone: { x: 1040, y: 232, },
        titleCenter: { x: 1120, y: 187, }
      }
    }
  },
  {
    month: { x: 475, y: 322, },
    date: { x: 524, y: 322, },
    streamCountPoint: { x: 900, y: 320, },
    singleStream: {
      time: { x: 647, y: 321, },
      hourSystem: { x: 647, y: 321, },
      timezone: { x: 693, y: 321, },
      titleCenter: { x: 900, y: 278, }
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
    month: { x: 482, y: 413, },
    date: { x: 531, y: 413, },
    streamCountPoint: { x: 922, y: 411, },
    singleStream: {
      time: { x: 653, y: 413, },
      hourSystem: { x: 653, y: 413, },
      timezone: { x: 698, y: 413, },
      titleCenter: { x: 921, y: 370, }
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
    month: { x: 491, y: 503, },
    date: { x: 540, y: 503, },
    streamCountPoint: { x: 935, y: 503, },
    singleStream: {
      time: { x: 662, y: 504, },
      hourSystem: { x: 662, y: 504, },
      timezone: { x: 707, y: 504, },
      titleCenter: { x: 936, y: 463, }
    },
    multiStream: {
      first: {
        time: { x: 662, y: 504, },
        hourSystem: { x: 662, y: 504, },
        timezone: { x: 707, y: 504, },
        titleCenter: { x: 770, y: 463, }
      },
      second: {
        time: { x: 935, y: 503, },
        hourSystem: { x: 935, y: 503, },
        timezone: { x: 982, y: 503, },
        titleCenter: { x: 1050, y: 463, }
      }
    }
  },
  {
    month: { x: 498, y: 593, },
    date: { x: 547, y: 593, },
    streamCountPoint: { x: 935, y: 596, },
    singleStream: {
      time: { x: 672, y: 596, },
      hourSystem: { x: 672, y: 596, },
      timezone: { x: 717, y: 595, },
      titleCenter: { x: 935, y: 552, }
    },
    multiStream: {
      first: {
        time: { x: 672, y: 596, },
        hourSystem: { x: 672, y: 596, },
        timezone: { x: 728, y: 595, },
        titleCenter: { x: 780, y: 552, }
      },
      second: {
        time: { x: 996, y: 596, },
        hourSystem: { x: 996, y: 596, },
        timezone: { x: 1053, y: 595, },
        titleCenter: { x: 1050, y: 553, }
      }
    }
  },
  {
    month: { x: 502, y: 686, },
    date: { x: 547, y: 686, },
    streamCountPoint: { x: 930, y: 682, },
    singleStream: {
      time: { x: 678, y: 685, },
      hourSystem: { x: 678, y: 685, },
      timezone: { x: 722, y: 685, },
      titleCenter: { x: 951, y: 640, }
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
  streamCounterBoundary: { vertical: 15, horizon: 300 },
  titleBoundary: { vertical: 15, horizon: 300 },
  titleMultiBoundary: { vertical: 15, horizon: 150 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
