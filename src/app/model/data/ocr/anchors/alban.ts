import { PointBoundary, ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 139, },
    singleStream: {
      time: { x: 661, y: 149, },
      hourSystem: { x: 661, y: 149, },
      timezone: { x: 642, y: 149, },
      titleCenter: { x: 945, y: 103, }
    },
    multiStream: {
      first: {
        time: { x: 661, y: 149, },
        hourSystem: { x: 661, y: 149, },
        timezone: { x: 642, y: 149, },
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
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 904, y: 261, },
    singleStream: {
      time: { x: 661, y: 258, },
      hourSystem: { x: 661, y: 258, },
      timezone: { x: 698, y: 258, },
      titleCenter: { x: 904, y: 220, }
    },
    multiStream: {
      first: {
        time: { x: 661, y: 258, },
        hourSystem: { x: 661, y: 258, },
        timezone: { x: 698, y: 258, },
        titleCenter: { x: 759, y: 211, }
      },
      second: {
        time: { x: 987, y: 258, },
        hourSystem: { x: 987, y: 258, },
        timezone: { x: 1026, y: 258, },
        titleCenter: { x: 1110, y: 211, }
      }
    }
  },
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 369, },
    singleStream: {
      time: { x: 661, y: 367, },
      hourSystem: { x: 661, y: 367, },
      timezone: { x: 698, y: 367, },
      titleCenter: { x: 888, y: 300, }
    },
    multiStream: {
      first: {
        time: { x: 661, y: 367, },
        hourSystem: { x: 661, y: 367, },
        timezone: { x: 698, y: 367, },
        titleCenter: { x: 757, y: 300, }
      },
      second: {
        time: { x: 986, y: 373, },
        hourSystem: { x: 986, y: 373, },
        timezone: { x: 1023, y: 373, },
        titleCenter: { x: 1099, y: 300, }
      }
    }
  },
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 476, },
    singleStream: {
      time: { x: 660, y: 475, },
      hourSystem: { x: 660, y: 475, },
      timezone: { x: 700, y: 475, },
      titleCenter: { x: 929, y: 432, }
    },
    multiStream: {
      first: {
        time: { x: 600, y: 475, },
        hourSystem: { x: 600, y: 475, },
        timezone: { x: 700, y: 475, },
        titleCenter: { x: 757, y: 425, }
      },
      second: {
        time: { x: 987, y: 475, },
        hourSystem: { x: 987, y: 475, },
        timezone: { x: 1023, y: 475, },
        titleCenter: { x: 1110, y: 425, }
      }
    }
  },
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 586, },
    singleStream: {
      time: { x: 660, y: 584, },
      hourSystem: { x: 660, y: 584, },
      timezone: { x: 698, y: 584, },
      titleCenter: { x: 929, y: 537, }
    },
    multiStream: {
      first: {
        time: { x: 661, y: 584, },
        hourSystem: { x: 660, y: 584, },
        timezone: { x: 698, y: 584, },
        titleCenter: { x: 757, y: 537, }
      },
      second: {
        time: { x: 987, y: 591, },
        hourSystem: { x: 987, y: 591, },
        timezone: { x: 1023, y: 591, },
        titleCenter: { x: 1110, y: 537, }
      }
    }
  },
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 696, },
    singleStream: {
      time: { x: 662, y: 693, },
      hourSystem: { x: 662, y: 693, },
      timezone: { x: 698, y: 693, },
      titleCenter: { x: 945, y: 648, }
    },
    multiStream: {
      first: {
        time: { x: 662, y: 693, },
        hourSystem: { x: 662, y: 693, },
        timezone: { x: 698, y: 693, },
        titleCenter: { x: 778, y: 653, }
      },
      second: {
        time: { x: 986, y: 700, },
        hourSystem: { x: 986, y: 700, },
        timezone: { x: 1022, y: 700, },
        titleCenter: { x: 1110, y: 653, }
      }
    }
  },
  {
    month: { x: 1084, y: 10, },
    date: { x: 578, y: 100, },
    streamCountPoint: { x: 888, y: 803, },
    singleStream: {
      time: { x: 660, y: 801, },
      hourSystem: { x: 660, y: 801, },
      timezone: { x: 697, y: 801, },
      titleCenter: { x: 945, y: 760, }
    },
    multiStream: {
      first: {
        time: { x: 660, y: 801, },
        hourSystem: { x: 660, y: 801, },
        timezone: { x: 697, y: 801, },
        titleCenter: { x: 778, y: 760, }
      },
      second: {
        time: { x: 987, y: 809, },
        hourSystem: { x: 987, y: 809, },
        timezone: { x: 1023, y: 809, },
        titleCenter: { x: 1110, y: 760, }
      }
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 5, horizon: 5 },
  streamCounterBoundary: { vertical: 15, horizon: 300 },
  titleBoundary: { vertical: 30, horizon: 300 },
  titleMultiBoundary: { vertical: 30, horizon: 150 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
