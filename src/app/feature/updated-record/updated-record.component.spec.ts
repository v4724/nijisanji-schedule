import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedRecordComponent } from './updated-record.component';

describe('UpdatedInfoComponent', () => {
  let component: UpdatedRecordComponent;
  let fixture: ComponentFixture<UpdatedRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
