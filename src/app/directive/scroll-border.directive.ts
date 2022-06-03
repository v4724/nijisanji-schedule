import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appScrollBorder]'
})
export class ScrollBorderDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.overflowY = 'auto'
    this.checkLocation()
  }

  @HostListener('scroll') onScroll() {
    this.checkLocation()
  }

  private checkLocation(): void {
    const scrollHeight = this.el.nativeElement.scrollHeight
    const height = this.el.nativeElement.clientHeight
    const top = this.el.nativeElement.scrollTop

    if (scrollHeight === height) {
      return
    }

    if ((top + height) >= scrollHeight - 1 ) {
      this.el.nativeElement.style.borderTop = '1px solid rgba(100,121,143,0.4)'
      this.el.nativeElement.style.borderBottom = ''
    } else if (top === 0){
      this.el.nativeElement.style.borderTop = ''
      this.el.nativeElement.style.borderBottom = '1px solid rgba(100,121,143,0.4)'
    } else {
      this.el.nativeElement.style.borderTop = '1px solid rgba(100,121,143,0.4)'
      this.el.nativeElement.style.borderBottom = '1px solid rgba(100,121,143,0.4)'
    }
  }
}
