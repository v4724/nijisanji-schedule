import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamAnchorPointComponent } from './stream-anchor-point.component';

describe('StreamAnchorPointComponent', () => {
  let component: StreamAnchorPointComponent;
  let fixture: ComponentFixture<StreamAnchorPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamAnchorPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamAnchorPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
