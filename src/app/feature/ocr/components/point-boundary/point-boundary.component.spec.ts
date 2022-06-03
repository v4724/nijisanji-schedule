import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointBoundaryComponent } from './point-boundary.component';

describe('AnchorPointComponent', () => {
  let component: PointBoundaryComponent;
  let fixture: ComponentFixture<PointBoundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointBoundaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointBoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
