import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditingCanvasComponent } from './template-editing-canvas.component';

describe('TemplateEditingCanvasComponent', () => {
  let component: TemplateEditingCanvasComponent;
  let fixture: ComponentFixture<TemplateEditingCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEditingCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
