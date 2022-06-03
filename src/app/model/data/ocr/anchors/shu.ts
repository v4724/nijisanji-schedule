import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 128, },
    streamCountPoint: { x: 284, y: 120, },
    singleStream: {
      time: { x: 101, y: 120, },
      hourSystem: { x: 128, y: 120, },
      timezone: { x: 153, y: 120, },
      titleCenter: { x: 400, y: 135, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 120, },
        hourSystem: { x: 128, y: 120, },
        timezone: { x: 153, y: 120, },
        titleCenter: { x: 281, y: 135, }
      },
      second: {
        time: { x: 363, y: 205, },
        hourSystem: { x: 390, y: 205, },
        timezone: { x: 415, y: 205, },
        titleCenter: { x: 560, y: 135, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 213, },
    streamCountPoint: { x: 297, y: 205, },
    singleStream: {
      time: { x: 101, y: 207, },
      hourSystem: { x: 128, y: 207, },
      timezone: { x: 153, y: 207, },
      titleCenter: { x: 400, y: 213, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 207, },
        hourSystem: { x: 128, y: 207, },
        timezone: { x: 153, y: 207, },
        titleCenter: { x: 281, y: 213, }
      },
      second: {
        time: { x: 363, y: 207, },
        hourSystem: { x: 390, y: 207, },
        timezone: { x: 415, y: 207, },
        titleCenter: { x: 560, y: 213, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 300, },
    streamCountPoint: { x: 297, y: 293, },
    singleStream: {
      time: { x: 101, y: 293, },
      hourSystem: { x: 128, y: 293, },
      timezone: { x: 153, y: 293, },
      titleCenter: { x: 400, y: 307, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 293, },
        hourSystem: { x: 128, y: 293, },
        timezone: { x: 153, y: 293, },
        titleCenter: { x: 281, y: 307, }
      },
      second: {
        time: { x: 363, y: 293, },
        hourSystem: { x: 390, y: 293, },
        timezone: { x: 415, y: 293, },
        titleCenter: { x: 560, y: 307, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 386, },
    streamCountPoint: { x: 297, y: 378, },
    singleStream: {
      time: { x: 101, y: 378, },
      hourSystem: { x: 128, y: 378, },
      timezone: { x: 153, y: 378, },
      titleCenter: { x: 400, y: 393, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 378, },
        hourSystem: { x: 128, y: 378, },
        timezone: { x: 153, y: 378, },
        titleCenter: { x: 281, y: 393, }
      },
      second: {
        time: { x: 363, y: 378, },
        hourSystem: { x: 390, y: 378, },
        timezone: { x: 415, y: 378, },
        titleCenter: { x: 560, y: 393, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 472, },
    streamCountPoint: { x: 297, y: 465, },
    singleStream: {
      time: { x: 101, y: 465, },
      hourSystem: { x: 128, y: 465, },
      timezone: { x: 153, y: 465, },
      titleCenter: { x: 400, y: 479, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 465, },
        hourSystem: { x: 128, y: 465, },
        timezone: { x: 153, y: 465, },
        titleCenter: { x: 281, y: 479, }
      },
      second: {
        time: { x: 363, y: 0, },
        hourSystem: { x: 390, y: 0, },
        timezone: { x: 415, y: 0, },
        titleCenter: { x: 560, y: 479, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 558, },
    streamCountPoint: { x: 297, y: 551, },
    singleStream: {
      time: { x: 101, y: 551, },
      hourSystem: { x: 128, y: 551, },
      timezone: { x: 153, y: 551, },
      titleCenter: { x: 400, y: 560, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 551, },
        hourSystem: { x: 128, y: 551, },
        timezone: { x: 153, y: 551, },
        titleCenter: { x: 281, y: 560, }
      },
      second: {
        time: { x: 363, y: 551, },
        hourSystem: { x: 390, y: 551, },
        timezone: { x: 415, y: 551, },
        titleCenter: { x: 560, y: 560, }
      }
    }
  },
  {
    month: { x: 508, y: 22, },
    date: { x: 27, y: 645, },
    streamCountPoint: { x: 297, y: 639, },
    singleStream: {
      time: { x: 101, y: 639, },
      hourSystem: { x: 128, y: 639, },
      timezone: { x: 153, y: 639, },
      titleCenter: { x: 400, y: 650, }
    },
    multiStream: {
      first: {
        time: { x: 101, y: 639, },
        hourSystem: { x: 128, y: 639, },
        timezone: { x: 153, y: 639, },
        titleCenter: { x: 281, y: 652, }
      },
      second: {
        time: { x: 363, y: 639, },
        hourSystem: { x: 390, y: 639, },
        timezone: { x: 415, y: 639, },
        titleCenter: { x: 560, y: 652, }
      }
    }
  }]

export const anchor: ScheduleAnchor ={
  pointBoundary: { vertical: 5, horizon: 5 },
  streamCounterBoundary: { vertical: 15, horizon: 250 },
  titleBoundary: { vertical: 30, horizon: 180 },
  titleMultiBoundary: { vertical: 30, horizon: 80 },
  streamAnchors: anchors
}
// anchors = [anchors[0]]
