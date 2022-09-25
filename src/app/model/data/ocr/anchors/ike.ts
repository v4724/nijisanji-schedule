import { ScheduleAnchor, StreamAnchor } from '@app/model/factory/ocr/transferScheduleOCR/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: { x: 561, y: 57, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 101, },
    singleStream: {
      time: { x: 920, y: 89, },
      hourSystem: { x: 950, y: 89, },
      timezone: { x: 972, y: 89, },
      titleCenter: { x: 1119, y: 109, }
    },
    multiStream: {
      first: {
        time: { x: 920, y: 89, },
        hourSystem: { x: 950, y: 89, },
        timezone: { x: 972, y: 89, },
        titleCenter: { x: 1119, y: 109, }
      },
      second: {
        time: { x: 922, y: 114, },
        hourSystem: { x: 950, y: 114, },
        timezone: { x: 972, y: 114, },
        titleCenter: { x: 1119, y: 118, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 185, },
    singleStream: {
      time: { x: 920, y: 173, },
      hourSystem: { x: 950, y: 173, },
      timezone: { x: 972, y: 173, },
      titleCenter: { x: 1119, y: 189, }
    },
    multiStream: {
      first: {
        time: { x: 920, y: 173, },
        hourSystem: { x: 950, y: 173, },
        timezone: { x: 972, y: 173, },
        titleCenter: { x: 1119, y: 173, }
      },
      second: {
        time: { x: 920, y: 200, },
        hourSystem: { x: 950, y: 200, },
        timezone: { x: 972, y: 200, },
        titleCenter: { x: 1119, y: 205, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 272, },
    singleStream: {
      time: { x: 918, y: 261, },
      hourSystem: { x: 949, y: 261, },
      timezone: { x: 970, y: 261, },
      titleCenter: { x: 1119, y: 277, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 261, },
        hourSystem: { x: 949, y: 261, },
        timezone: { x: 970, y: 261, },
        titleCenter: { x: 1119, y: 257, }
      },
      second: {
        time: { x: 921, y: 286, },
        hourSystem: { x: 947, y: 286, },
        timezone: { x: 967, y: 286, },
        titleCenter: { x: 1119, y: 290, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 361, },
    singleStream: {
      time: { x: 919, y: 348, },
      hourSystem: { x: 949, y: 348, },
      timezone: { x: 969, y: 348, },
      titleCenter: { x: 1119, y: 361, }
    },
    multiStream: {
      first: {
        time: { x: 919, y: 348, },
        hourSystem: { x: 949, y: 348, },
        timezone: { x: 969, y: 348, },
        titleCenter: { x: 1119, y: 349, }
      },
      second: {
        time: { x: 918, y: 373, },
        hourSystem: { x: 949, y: 373, },
        timezone: { x: 971, y: 373, },
        titleCenter: { x: 1119, y: 381, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 450, },
    singleStream: {
      time: { x: 920, y: 438, },
      hourSystem: { x: 948, y: 438, },
      timezone: { x: 968, y: 438, },
      titleCenter: { x: 1119, y: 453, }
    },
    multiStream: {
      first: {
        time: { x: 920, y: 438, },
        hourSystem: { x: 948, y: 438, },
        timezone: { x: 968, y: 438, },
        titleCenter: { x: 1119, y: 437, }
      },
      second: {
        time: { x: 920, y: 449, },
        hourSystem: { x: 948, y: 449, },
        timezone: { x: 968, y: 449, },
        titleCenter: { x: 1119, y: 459, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 538, },
    singleStream: {
      time: { x: 918, y: 526, },
      hourSystem: { x: 948, y: 526, },
      timezone: { x: 969, y: 526, },
      titleCenter: { x: 1119, y: 541, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 526, },
        hourSystem: { x: 948, y: 526, },
        timezone: { x: 969, y: 526, },
        titleCenter: { x: 1119, y: 525, }
      },
      second: {
        time: { x: 914, y: 551, },
        hourSystem: { x: 950, y: 551, },
        timezone: { x: 965, y: 551, },
        titleCenter: { x: 1119, y: 557, }}
    }
  },
  {
    month: { x: 561, y: 55, },
    date: { x: 520, y: 57, },
    streamCountPoint: { x: 968, y: 626, },
    singleStream: {
      time: { x: 918, y: 613, },
      hourSystem: { x: 947, y: 613, },
      timezone: { x: 969, y: 613, },
      titleCenter: { x: 1119, y: 629, }
    },
    multiStream: {
      first: {
        time: { x: 918, y: 613, },
        hourSystem: { x: 947, y: 613, },
        timezone: { x: 969, y: 613, },
        titleCenter: { x: 1119, y: 610, }
      },
      second: {
        time: { x: 919, y: 639, },
        hourSystem: { x: 948, y: 639, },
        timezone: { x: 968, y: 639, },
        titleCenter: { x: 1119, y: 644, }}
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 10, horizon: 12 },
  streamCounterBoundary: { vertical: 20, horizon: 20 },
  titleBoundary: { vertical: 30, horizon: 110 },
  titleMultiBoundary: { vertical: 30, horizon: 110 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
