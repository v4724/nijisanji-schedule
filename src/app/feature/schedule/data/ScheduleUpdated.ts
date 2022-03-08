import { Streamer } from '@app/feature/schedule/data/Streamer'

export const scheduleUpdatedMap = new Map<Streamer, boolean>()

scheduleUpdatedMap.set(Streamer.Shu, true)
scheduleUpdatedMap.set(Streamer.Vox, true)
scheduleUpdatedMap.set(Streamer.Mysta, true)
scheduleUpdatedMap.set(Streamer.Ike, true)
scheduleUpdatedMap.set(Streamer.Luca, true)

scheduleUpdatedMap.set(Streamer.Uki, true)
scheduleUpdatedMap.set(Streamer.Alban, true)
scheduleUpdatedMap.set(Streamer.Fulgur, true)
scheduleUpdatedMap.set(Streamer.Yugo, true)
scheduleUpdatedMap.set(Streamer.Sonny, true)

scheduleUpdatedMap.set(Streamer.Elira, true)
scheduleUpdatedMap.set(Streamer.Enna, false)
scheduleUpdatedMap.set(Streamer.Nina, false)
scheduleUpdatedMap.set(Streamer.Finana, true)
scheduleUpdatedMap.set(Streamer.Selen, true)
scheduleUpdatedMap.set(Streamer.Petra, true)
scheduleUpdatedMap.set(Streamer.Pomu, true)
scheduleUpdatedMap.set(Streamer.Reimu, true)
scheduleUpdatedMap.set(Streamer.Millie, true)
scheduleUpdatedMap.set(Streamer.Rosemi, true)

export const nextScheduleUpdatedMap = new Map<Streamer, boolean>()
nextScheduleUpdatedMap.set(Streamer.Shu, false)
nextScheduleUpdatedMap.set(Streamer.Vox, false)
nextScheduleUpdatedMap.set(Streamer.Mysta, false)
nextScheduleUpdatedMap.set(Streamer.Ike, false)
nextScheduleUpdatedMap.set(Streamer.Luca, false)

nextScheduleUpdatedMap.set(Streamer.Uki, false)
nextScheduleUpdatedMap.set(Streamer.Alban, false)
nextScheduleUpdatedMap.set(Streamer.Fulgur, false)
nextScheduleUpdatedMap.set(Streamer.Yugo, false)
nextScheduleUpdatedMap.set(Streamer.Sonny, false)

nextScheduleUpdatedMap.set(Streamer.Elira, false)
nextScheduleUpdatedMap.set(Streamer.Enna, false)
nextScheduleUpdatedMap.set(Streamer.Nina, false)
nextScheduleUpdatedMap.set(Streamer.Finana, false)
nextScheduleUpdatedMap.set(Streamer.Selen, false)
nextScheduleUpdatedMap.set(Streamer.Petra, false)
nextScheduleUpdatedMap.set(Streamer.Pomu, false)
nextScheduleUpdatedMap.set(Streamer.Reimu, false)
nextScheduleUpdatedMap.set(Streamer.Millie, false)
nextScheduleUpdatedMap.set(Streamer.Rosemi, false)
