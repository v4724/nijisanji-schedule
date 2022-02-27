import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamGroupComponent } from './stream-group.component';

describe('StreamGroupComponent', () => {
  let component: StreamGroupComponent;
  let fixture: ComponentFixture<StreamGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
