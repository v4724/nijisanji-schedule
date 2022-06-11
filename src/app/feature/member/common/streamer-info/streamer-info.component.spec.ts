import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerInfoComponent } from './streamer-info.component';

describe('StreamerInfoComponent', () => {
  let component: StreamerInfoComponent;
  let fixture: ComponentFixture<StreamerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
