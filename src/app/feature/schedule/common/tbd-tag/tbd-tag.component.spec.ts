import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBDTagComponent } from './tbd-tag.component';

describe('TBDTagComponent', () => {
  let component: TBDTagComponent;
  let fixture: ComponentFixture<TBDTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TBDTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TBDTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
