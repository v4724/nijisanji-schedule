import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatStreamerComponent } from './feat-streamer.component';

describe('FeatStreamerComponent', () => {
  let component: FeatStreamerComponent;
  let fixture: ComponentFixture<FeatStreamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatStreamerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
