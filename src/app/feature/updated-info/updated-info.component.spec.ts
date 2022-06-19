import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedInfoComponent } from './updated-info.component';

describe('UpdatedInfoComponent', () => {
  let component: UpdatedInfoComponent;
  let fixture: ComponentFixture<UpdatedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
