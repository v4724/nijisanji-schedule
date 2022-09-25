import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormResultComponent } from './template-form-result.component';

describe('TemplateFormResultComponent', () => {
  let component: TemplateFormResultComponent;
  let fixture: ComponentFixture<TemplateFormResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
