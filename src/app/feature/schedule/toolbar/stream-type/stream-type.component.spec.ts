import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamTypeComponent } from './stream-type.component';

describe('StreamTypeComponent', () => {
  let component: StreamTypeComponent;
  let fixture: ComponentFixture<StreamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
