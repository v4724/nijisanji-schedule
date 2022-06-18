import { Component, Input, OnInit } from '@angular/core'
import { openUrl } from '@app/feature/schedule/utils'
import { StreamViewItem } from '@app/model/vo/StreamVo'
import { AdminService } from '@app/service/admin.service'

@Component({
  selector: 'app-display-text',
  templateUrl: './display-text.component.html',
  styleUrls: ['./display-text.component.scss']
})
export class DisplayTextComponent implements OnInit {

  @Input() stream: StreamViewItem | undefined;

  openUrl = openUrl
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  openStreamLink(): void {
    const editable = this.adminService.editable$.getValue()
    if (editable && this.stream) {
      this.adminService.openModal(this.stream)
      return
    }

    if (!this.stream || this.stream?.isCanceled) {
      return
    }

    if (this.stream?.link) {
      openUrl(this.stream.link)
    } else {
      openUrl(this.stream.streamerInfo.youtubeLink)
    }
  }
}
