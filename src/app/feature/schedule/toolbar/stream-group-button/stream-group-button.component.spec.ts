import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamGroupButtonComponent } from './stream-group-button.component';

describe('StreamGroupButtonComponent', () => {
  let component: StreamGroupButtonComponent;
  let fixture: ComponentFixture<StreamGroupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamGroupButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamGroupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
