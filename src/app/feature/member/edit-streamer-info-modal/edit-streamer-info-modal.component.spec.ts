import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreamerInfoModalComponent } from './edit-streamer-info-modal.component';

describe('EditModalComponent', () => {
  let component: EditStreamerInfoModalComponent;
  let fixture: ComponentFixture<EditStreamerInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStreamerInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
