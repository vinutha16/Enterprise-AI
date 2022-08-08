import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourSegmentComponent } from './build-your-segment.component';

describe('BuildYourSegmentComponent', () => {
  let component: BuildYourSegmentComponent;
  let fixture: ComponentFixture<BuildYourSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildYourSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildYourSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
