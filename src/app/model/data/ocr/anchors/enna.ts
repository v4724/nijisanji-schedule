import { ScheduleAnchor, StreamAnchor } from '@app/model/data/ocr/TransferScheduleOCR'

let anchors: Array<StreamAnchor> = [
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 301, },
    singleStream: {
      time: { x: 853, y: 301, },
      hourSystem: { x: 853, y: 301, },
      timezone: { x: 889, y: 301, },
      titleCenter: { x: 980, y: 258, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 301, },
        hourSystem: { x: 726, y: 301, },
        timezone: { x: 762, y: 301, },
        titleCenter: { x: 854, y: 258, }
      },
      second: {
        time: { x: 1016, y: 301, },
        hourSystem: { x: 1016, y: 301, },
        timezone: { x: 1050, y: 301, },
        titleCenter: { x: 1138, y: 258, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 393, },
    singleStream: {
      time: { x: 853, y: 393, },
      hourSystem: { x: 853, y: 393, },
      timezone: { x: 889, y: 393, },
      titleCenter: { x: 980, y: 340, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 393, },
        hourSystem: { x: 726, y: 393, },
        timezone: { x: 762, y: 393, },
        titleCenter: { x: 854, y: 340, }
      },
      second: {
        time: { x: 1016, y: 393, },
        hourSystem: { x: 1016, y: 393, },
        timezone: { x: 1050, y: 393, },
        titleCenter: { x: 1138, y: 340, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 483, },
    singleStream: {
      time: { x: 853, y: 483, },
      hourSystem: { x: 853, y: 483, },
      timezone: { x: 899, y: 483, },
      titleCenter: { x: 980, y: 430, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 483, },
        hourSystem: { x: 726, y: 483, },
        timezone: { x: 762, y: 483, },
        titleCenter: { x: 854, y: 430, }
      },
      second: {
        time: { x: 1016, y: 483, },
        hourSystem: { x: 1016, y: 483, },
        timezone: { x: 1050, y: 483, },
        titleCenter: { x: 1138, y: 430, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 577, },
    singleStream: {
      time: { x: 854, y: 577, },
      hourSystem: { x: 854, y: 577, },
      timezone: { x: 899, y: 577, },
      titleCenter: { x: 980, y: 530, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 577, },
        hourSystem: { x: 726, y: 577, },
        timezone: { x: 762, y: 577, },
        titleCenter: { x: 854, y: 530, }
      },
      second: {
        time: { x: 1016, y: 577, },
        hourSystem: { x: 1016, y: 577, },
        timezone: { x: 1050, y: 577, },
        titleCenter: { x: 1138, y: 530, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 671, },
    singleStream: {
      time: { x: 854, y: 671, },
      hourSystem: { x: 854, y: 671, },
      timezone: { x: 891, y: 671, },
      titleCenter: { x: 980, y: 626, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 671, },
        hourSystem: { x: 726, y: 671, },
        timezone: { x: 762, y: 671, },
        titleCenter: { x: 854, y: 626, }
      },
      second: {
        time: { x: 1016, y: 671, },
        hourSystem: { x: 1016, y: 671, },
        timezone: { x: 1050, y: 671, },
        titleCenter: { x: 1138, y: 626, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 766, },
    singleStream: {
      time: { x: 853, y: 766, },
      hourSystem: { x: 853, y: 766, },
      timezone: { x: 889, y: 766, },
      titleCenter: { x: 980, y: 720, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 766, },
        hourSystem: { x: 726, y: 766, },
        timezone: { x: 762, y: 766, },
        titleCenter: { x: 854, y: 720, }
      },
      second: {
        time: { x: 1016, y: 766, },
        hourSystem: { x: 1016, y: 766, },
        timezone: { x: 1050, y: 766, },
        titleCenter: { x: 1138, y: 720, }
      }
    }
  },
  {
    month: {x: 689, y: 72 },
    date: { x: 630, y: 248, },
    streamCountPoint: { x: 922, y: 861, },
    singleStream: {
      time: { x: 853, y: 861, },
      hourSystem: { x: 853, y: 861, },
      timezone: { x: 889, y: 861, },
      titleCenter: { x: 980, y: 820, }
    },
    multiStream: {
      first: {
        time: { x: 726, y: 861, },
        hourSystem: { x: 726, y: 861, },
        timezone: { x: 762, y: 861, },
        titleCenter: { x: 854, y: 820, }
      },
      second: {
        time: { x: 1016, y: 861, },
        hourSystem: { x: 1016, y: 861, },
        timezone: { x: 1050, y: 861, },
        titleCenter: { x: 1138, y: 820, }
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
