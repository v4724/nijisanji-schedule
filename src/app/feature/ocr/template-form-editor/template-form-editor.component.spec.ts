import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormEditorComponent } from './template-form-editor.component';

describe('TemplateFormComponent', () => {
  let component: TemplateFormEditorComponent;
  let fixture: ComponentFixture<TemplateFormEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
