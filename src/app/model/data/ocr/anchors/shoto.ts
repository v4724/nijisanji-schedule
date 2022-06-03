import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 116, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 166, },
    singleStream: {
      time: { x: 768, y: 170, },
      hourSystem: { x: 805, y: 168, },
      timezone: { x: 830, y: 166, },
      titleCenter: { x: 1013, y: 161, }
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
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 206, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 253, },
    singleStream: {
      time: { x: 768, y: 259, },
      hourSystem: { x: 802, y: 256, },
      timezone: { x: 830, y: 253, },
      titleCenter: { x: 1013, y: 244, }
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
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 292, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 341, },
    singleStream: {
      time: { x: 768, y: 345, },
      hourSystem: { x: 805, y: 342, },
      timezone: { x: 830, y: 341, },
      titleCenter: { x: 1013, y: 327, }
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
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 384, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 429, },
    singleStream: {
      time: { x: 768, y: 433, },
      hourSystem: { x: 805, y: 431, },
      timezone: { x: 830, y: 429, },
      titleCenter: { x: 1013, y: 411, }
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
    month: { x: 1027, y: 86, },
    day: { x: 744, y: 468, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 518, },
    singleStream: {
      time: { x: 768, y: 522, },
      hourSystem: { x: 805, y: 520, },
      timezone: { x: 830, y: 518, },
      titleCenter: { x: 1013, y: 495, }
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
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 559, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 830, y: 604, },
    singleStream: {
      time: { x: 767, y: 609, },
      hourSystem: { x: 805, y: 607, },
      timezone: { x: 830, y: 604, },
      titleCenter: { x: 1013, y: 598, }
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
    month: { x: 1027, y: 86, },
    day: { x: 732, y: 647, },
    date: { x: 1096, y: 84, },
    streamCountPoint: { x: 829, y: 694, },
    singleStream: {
      time: { x: 764, y: 699, },
      hourSystem: { x: 803, y: 696, },
      timezone: { x: 829, y: 694, },
      titleCenter: { x: 1013, y: 686, }
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
  titleBoundary: { vertical: 30, horizon: 180 },
  titleMultiBoundary: { vertical: 30, horizon: 180 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
