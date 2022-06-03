import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'


let anchors: Array<StreamAnchor> = [
  {
    date: { x: 201, y: 348, },
    streamCountPoint: { x: 597, y: 367, },
    singleStream: {
      time: { x: 407, y: 367, },
      hourSystem: { x: 458, y: 367, },
      timezone: { x: 500, y: 367, },
      titleCenter: { x: 502, y: 324, }
    },
    multiStream: {
      first: {
        time: { x: 364, y: 369, },
        hourSystem: { x: 402, y: 369, },
        timezone: { x: 434, y: 369, },
        titleCenter: { x: 460, y: 322, }
      },
      second: {
        time: { x: 645, y: 369, },
        hourSystem: { x: 686, y: 369, },
        timezone: { x: 719, y: 369, },
        titleCenter: { x: 720, y: 322, }}
    }
  },
  {
    date: { x: 201, y: 474, },
    streamCountPoint: { x: 597, y: 490, },
    singleStream: {
      time: { x: 407, y: 490, },
      hourSystem: { x: 459, y: 490, },
      timezone: { x: 500, y: 490, },
      titleCenter: { x: 544, y: 445, }
    },
    multiStream: {
      first: {
        time: { x: 360, y: 491, },
        hourSystem: { x: 402, y: 491, },
        timezone: { x: 435, y: 491, },
        titleCenter: { x: 450, y: 447, }
      },
      second: {
        time: { x: 636, y: 491, },
        hourSystem: { x: 688, y: 491, },
        timezone: { x: 719, y: 491, },
        titleCenter: { x: 720, y: 447, }}
    }
  },
  {
    date: { x: 201, y: 600, },
    streamCountPoint: { x: 597, y: 619, },
    singleStream: {
      time: { x: 918, y: 261, },
      hourSystem: { x: 949, y: 261, },
      timezone: { x: 970, y: 261, },
      titleCenter: { x: 1119, y: 277, }
    },
    multiStream: {
      first: {
        time: { x: 364, y: 619, },
        hourSystem: { x: 402, y: 619, },
        timezone: { x: 434, y: 619, },
        titleCenter: { x: 460, y: 573, }
      },
      second: {
        time: { x: 645, y: 619, },
        hourSystem: { x: 686, y: 619, },
        timezone: { x: 719, y: 619, },
        titleCenter: { x: 720, y: 572, }}
    }
  },
  {
    date: { x: 201, y: 725, },
    streamCountPoint: { x: 597, y: 748, },
    singleStream: {
      time: { x: 407, y: 744, },
      hourSystem: { x: 457, y: 744, },
      timezone: { x: 498, y: 744, },
      titleCenter: { x: 520, y: 701, }
    },
    multiStream: {
      first: {
        time: { x: 364, y: 744, },
        hourSystem: { x: 402, y: 744, },
        timezone: { x: 434, y: 744, },
        titleCenter: { x: 460, y: 698, }
      },
      second: {
        time: { x: 645, y: 744, },
        hourSystem: { x: 686, y: 744, },
        timezone: { x: 719, y: 744, },
        titleCenter: { x: 720, y: 698, }}
    }
  },
  {
    date: { x: 201, y: 851, },
    streamCountPoint: { x: 597, y: 877, },
    singleStream: {
      time: { x: 407, y: 869, },
      hourSystem: { x: 459, y: 869, },
      timezone: { x: 499, y: 869, },
      titleCenter: { x: 520, y: 826, }
    },
    multiStream: {
      first: {
        time: { x: 364, y: 869, },
        hourSystem: { x: 402, y: 869, },
        timezone: { x: 434, y: 869, },
        titleCenter: { x: 460, y: 823, }
      },
      second: {
        time: { x: 645, y: 869, },
        hourSystem: { x: 686, y: 869, },
        timezone: { x: 719, y: 869, },
        titleCenter: { x: 720, y: 823, }}
    }
  },
  {
    date: { x: 202, y: 977, },
    streamCountPoint: { x: 597, y: 994, },
    singleStream: {
      time: { x: 407, y: 994, },
      hourSystem: { x: 459, y: 994, },
      timezone: { x: 499, y: 994, },
      titleCenter: { x: 520, y: 951, }
    },
    multiStream: {
      first: {
        time: { x: 364, y: 994, },
        hourSystem: { x: 402, y: 994, },
        timezone: { x: 434, y: 994, },
        titleCenter: { x: 460, y: 948, }
      },
      second: {
        time: { x: 645, y: 994, },
        hourSystem: { x: 686, y: 994, },
        timezone: { x: 719, y: 994, },
        titleCenter: { x: 720, y: 948, }}
    }
  },
  {
    date: { x: 201, y: 1102, },
    streamCountPoint: { x: 597, y: 1118, },
    singleStream: {
      time: { x: 407, y: 1118, },
      hourSystem: { x: 458, y: 1118, },
      timezone: { x: 498, y: 1118, },
      titleCenter: { x: 520, y: 1076, }
    },
    multiStream: {
      first: {
        time: { x: 360, y: 1122, },
        hourSystem: { x: 398, y: 1122, },
        timezone: { x: 430, y: 1122, },
        titleCenter: { x: 460, y: 1073, }
      },
      second: {
        time: { x: 629, y: 1122, },
        hourSystem: { x: 667, y: 1122, },
        timezone: { x: 699, y: 1122, },
        titleCenter: { x: 720, y: 1073, }}
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 10, horizon: 12 },
  streamCounterBoundary: { vertical: 20, horizon: 200 },
  titleBoundary: { vertical: 30, horizon: 200 },
  titleMultiBoundary: { vertical: 30, horizon: 140 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
