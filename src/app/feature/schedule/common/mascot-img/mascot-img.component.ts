import { Component, ElementRef, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-mascot-img',
  templateUrl: './mascot-img.component.html',
  styleUrls: ['./mascot-img.component.scss']
})
export class MascotImgComponent implements OnInit {

  @Input() src: string = ''

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.parentElement.classList.add('position-relative')
  }

}
