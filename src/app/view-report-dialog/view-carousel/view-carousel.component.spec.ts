import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarouselComponent } from './view-carousel.component';

describe('ViewCarouselComponent', () => {
  let component: ViewCarouselComponent;
  let fixture: ComponentFixture<ViewCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
