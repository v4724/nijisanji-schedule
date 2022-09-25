import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectCanvasComponent } from './rect-canvas.component';

describe('RectCanvasComponent', () => {
  let component: RectCanvasComponent;
  let fixture: ComponentFixture<RectCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
