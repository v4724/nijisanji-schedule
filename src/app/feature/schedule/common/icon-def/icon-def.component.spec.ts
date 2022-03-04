import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDefComponent } from './icon-def.component';

describe('IconDefComponent', () => {
  let component: IconDefComponent;
  let fixture: ComponentFixture<IconDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
