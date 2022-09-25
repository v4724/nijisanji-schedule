import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-my-canvas',
  templateUrl: './my-canvas.component.html',
  styleUrls: ['./my-canvas.component.scss']
})
export class MyCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;
  ctx?: CanvasRenderingContext2D;

  isDrawing = false

  constructor() {
  }

  get canvasWidth () {
    return this.canvas?.nativeElement.width ?? 0
  }

  get canvasHeight () {
    return this.canvas?.nativeElement.height ?? 0
  }

  get offsetX () {
    return this.canvas?.nativeElement.offsetLeft ?? 0
  }

  get offsetY () {
    return this.canvas?.nativeElement.offsetTop ?? 0
  }

  ngOnInit(): void {
  }

  ngAfterViewInit (): void {
    // @ts-ignore
    this.canvas?.nativeElement.width = 1296
    // @ts-ignore
    this.canvas?.nativeElement.height = 645

    this.ctx = this.canvas?.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  resetSize(w: number, h: number) {
    // @ts-ignore
    this.canvas?.nativeElement.width = w
    // @ts-ignore
    this.canvas?.nativeElement.height = h
  }

  clearCanvas (e?: Event) {
    this.ctx?.clearRect(0, 0, this.canvas?.nativeElement.width ?? 1, this.canvas?.nativeElement.height ?? 1);

    e?.stopPropagation()
  }
}
