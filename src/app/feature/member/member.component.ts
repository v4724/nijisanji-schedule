import { Component, OnInit } from '@angular/core';
import { openUrl } from '@app/feature/schedule/utils'
import { AdminService } from '@app/service/admin.service'
import { initStreamerInfoVo, StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoDto } from '@app/model/dto/StreamerInfoDto'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import * as lodash from 'lodash'
import { defaultStreamers } from '@app/model/data/streamerInfo'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  streamers: Array<StreamerInfoVo> = []
  openUrl = openUrl
  streamerInfoVo = initStreamerInfoVo()

  constructor(public adminService: AdminService,
              public streamerInfoService: StreamerInfoService) { }

  ngOnInit(): void {
    this.streamerInfoService.streamerInfos$.subscribe((data) => {
      this.streamers = lodash.cloneDeep(data)
    })
  }

  batchImport(): void {
    const infos = defaultStreamers
    infos.forEach((info: any) => {
      this.streamerInfoService.add(info as StreamerInfoDto)
    })
  }
}
