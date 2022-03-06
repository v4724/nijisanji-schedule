import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWeekComponent } from './date-week.component';

describe('DateWeekComponent', () => {
  let component: DateWeekComponent;
  let fixture: ComponentFixture<DateWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
