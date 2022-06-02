import { Component, Input, OnInit } from '@angular/core'
import { openUrl } from '@app/feature/schedule/utils'
import { FirebaseStreamViewItem, StreamViewItem } from '@app/feature/schedule/type'

@Component({
  selector: 'app-display-text',
  templateUrl: './display-text.component.html',
  styleUrls: ['./display-text.component.scss']
})
export class DisplayTextComponent implements OnInit {

  @Input() stream: StreamViewItem | FirebaseStreamViewItem | undefined;

  openUrl = openUrl
  constructor() { }

  ngOnInit(): void {
  }

  openStreamLink(): void {
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
