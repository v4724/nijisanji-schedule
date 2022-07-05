import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Toast } from 'bootstrap'
import { ToastService } from '@app/common-component/toast/toast.service'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @ViewChild('liveToast',{ static:true }) toastEl!: ElementRef<HTMLDivElement>;

  toast: Toast | null = null;
  resultMsg: string = ''

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
    this.toast = new Toast(this.toastEl.nativeElement,{});
    this.toastService.show$.subscribe((show) => {
      if (show) {
        this.toast!.show()
      } else {
        this.toast!.hide()
      }
    })
  }

}
