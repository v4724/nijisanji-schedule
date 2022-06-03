import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedBellComponent } from './updated-bell.component';

describe('UpdateBellComponent', () => {
  let component: UpdatedBellComponent;
  let fixture: ComponentFixture<UpdatedBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedBellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
