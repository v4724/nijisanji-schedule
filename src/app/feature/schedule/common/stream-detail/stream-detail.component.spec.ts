import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDetailComponent } from './stream-detail.component';

describe('StreamMenuComponent', () => {
  let component: StreamDetailComponent;
  let fixture: ComponentFixture<StreamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
