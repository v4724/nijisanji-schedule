import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 983, y: 95, },
    singleStream: {
      time: { x: 763, y: 95, },
      hourSystem: { x: 763, y: 95, },
      timezone: { x: 817, y: 95, },
      titleCenter: { x: 975, y: 63, }
    },
    multiStream: {
      first: {
        time: { x: 752, y: 95, },
        hourSystem: { x: 752, y: 95, },
        timezone: { x: 785, y: 95, },
        titleCenter: { x: 856, y: 63, }
      },
      second: {
        time: { x: 1010, y: 95, },
        hourSystem: { x: 1010, y: 95, },
        timezone: { x: 1042, y: 95, },
        titleCenter: { x: 1138, y: 63, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 984, y: 180, },
    singleStream: {
      time: { x: 740, y: 168, },
      hourSystem: { x: 740, y: 168, },
      timezone: { x: 784, y: 168, },
      titleCenter: { x: 955, y: 145, }
    },
    multiStream: {
      first: {
        time: { x: 735, y: 180, },
        hourSystem: { x: 735, y: 180, },
        timezone: { x: 774, y: 180, },
        titleCenter: { x: 857, y: 145, }
      },
      second: {
        time: { x: 1010, y: 180, },
        hourSystem: { x: 1010, y: 180, },
        timezone: { x: 1042, y: 180, },
        titleCenter: { x: 1138, y: 145, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 983, y: 252, },
    singleStream: {
      time: { x: 763, y: 252, },
      hourSystem: { x: 763, y: 252, },
      timezone: { x: 817, y: 252, },
      titleCenter: { x: 975, y: 226, }
    },
    multiStream: {
      first: {
        time: { x: 752, y: 252, },
        hourSystem: { x: 752, y: 252, },
        timezone: { x: 785, y: 252, },
        titleCenter: { x: 856, y: 226, }
      },
      second: {
        time: { x: 1010, y: 252, },
        hourSystem: { x: 1010, y: 252, },
        timezone: { x: 1042, y: 252, },
        titleCenter: { x: 1138, y: 226, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 984, y: 346, },
    singleStream: {
      time: { x: 740, y: 336, },
      hourSystem: { x: 740, y: 336, },
      timezone: { x: 784, y: 336, },
      titleCenter: { x: 955, y: 310, }
    },
    multiStream: {
      first: {
        time: { x: 735, y: 346, },
        hourSystem: { x: 735, y: 346, },
        timezone: { x: 780, y: 346, },
        titleCenter: { x: 857, y: 310, }
      },
      second: {
        time: { x: 1020, y: 346, },
        hourSystem: { x: 1020, y: 346, },
        timezone: { x: 1050, y: 346, },
        titleCenter: { x: 1138, y: 310, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 983, y: 430, },
    singleStream: {
      time: { x: 763, y: 425, },
      hourSystem: { x: 763, y: 425, },
      timezone: { x: 810, y: 425, },
      titleCenter: { x: 975, y: 391, }
    },
    multiStream: {
      first: {
        time: { x: 752, y: 430, },
        hourSystem: { x: 752, y: 430, },
        timezone: { x: 785, y: 430, },
        titleCenter: { x: 856, y: 391, }
      },
      second: {
        time: { x: 1010, y: 430, },
        hourSystem: { x: 1010, y: 430, },
        timezone: { x: 1042, y: 430, },
        titleCenter: { x: 1138, y: 391, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 984, y: 514, },
    singleStream: {
      time: { x: 740, y: 504, },
      hourSystem: { x: 740, y: 504, },
      timezone: { x: 784, y: 504, },
      titleCenter: { x: 955, y: 479, }
    },
    multiStream: {
      first: {
        time: { x: 760, y: 508, },
        hourSystem: { x: 760, y: 508, },
        timezone: { x: 789, y: 508, },
        titleCenter: { x: 857, y: 479, }
      },
      second: {
        time: { x: 1010, y: 508, },
        hourSystem: { x: 1010, y: 508, },
        timezone: { x: 1042, y: 508, },
        titleCenter: { x: 1138, y: 479, }
      }
    }
  },
  {
    month: {x: 1115, y: 11 },
    date: { x: 1115, y: 11, },
    streamCountPoint: { x: 983, y: 595, },
    singleStream: {
      time: { x: 763, y: 595, },
      hourSystem: { x: 763, y: 595, },
      timezone: { x: 817, y: 595, },
      titleCenter: { x: 975, y: 562, }
    },
    multiStream: {
      first: {
        time: { x: 743, y: 595, },
        hourSystem: { x: 743, y: 595, },
        timezone: { x: 785, y: 595, },
        titleCenter: { x: 856, y: 562, }
      },
      second: {
        time: { x: 1010, y: 595, },
        hourSystem: { x: 1010, y: 595, },
        timezone: { x: 1042, y: 595, },
        titleCenter: { x: 1138, y: 562, }
      }
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 5, horizon: 5 },
  streamCounterBoundary: { vertical: 15, horizon: 250 },
  titleBoundary: { vertical: 20, horizon: 250 },
  titleMultiBoundary: { vertical: 25, horizon: 125 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
