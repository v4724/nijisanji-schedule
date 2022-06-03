import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoiceDetailModalComponent } from './edit-voice-detail-modal.component';

describe('EditVoiceDetailModalComponent', () => {
  let component: EditVoiceDetailModalComponent;
  let fixture: ComponentFixture<EditVoiceDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVoiceDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoiceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
