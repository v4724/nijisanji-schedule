import { TemplateAnchor } from '@app/model/vo/ScheduleTemplate/TemplateAnchor'

export class ScheduleTemplateVo {
  id?: string
  streamer: string
  name: string
  templateUrl: string
  anchor: TemplateAnchor

  constructor () {
    this.streamer = ''
    this.name = ''
    this.templateUrl = ''
    this.anchor = new TemplateAnchor()
  }
}

