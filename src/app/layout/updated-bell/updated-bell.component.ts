import { Component, OnInit } from '@angular/core';
import { UpdatedInfoService } from '@app/service/updated-info.service'
import { skip } from 'rxjs/operators'

@Component({
  selector: 'app-updated-bell',
  templateUrl: './updated-bell.component.html',
  styleUrls: ['./updated-bell.component.scss']
})
export class UpdatedBellComponent implements OnInit {

  update = false

  constructor(public service: UpdatedInfoService) {

  }
  ngOnInit(): void {
    this.service.updated$
        .pipe(
          skip(1)
        )
        .subscribe((result) => {
          console.log(result)
          this.update = true
        })
  }

  click (): void {
    this.update = false
  }
}
