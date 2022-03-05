import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotImgComponent } from './mascot-img.component';

describe('MascotImgComponent', () => {
  let component: MascotImgComponent;
  let fixture: ComponentFixture<MascotImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MascotImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
