import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowLoaderComponent } from './rainbow-loader.component';

describe('RainbowLoaderComponent', () => {
  let component: RainbowLoaderComponent;
  let fixture: ComponentFixture<RainbowLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainbowLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainbowLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
