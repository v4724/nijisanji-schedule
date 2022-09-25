import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectListCanvasComponent } from './rect-list-canvas.component';

describe('RectListCanvasComponent', () => {
  let component: RectListCanvasComponent;
  let fixture: ComponentFixture<RectListCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectListCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectListCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
