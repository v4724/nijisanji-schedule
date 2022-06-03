import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorDetailComponent } from './anchor-detail.component';

describe('EditAnchorDetailComponent', () => {
  let component: AnchorDetailComponent;
  let fixture: ComponentFixture<AnchorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
