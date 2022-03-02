import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCheckedListComponent } from './schedule-checked-list.component';

describe('ScheduleCheckedListComponent', () => {
  let component: ScheduleCheckedListComponent;
  let fixture: ComponentFixture<ScheduleCheckedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCheckedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCheckedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
