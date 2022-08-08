import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivergeBarChartComponent } from './diverge-bar-chart.component';

describe('DivergeBarChartComponent', () => {
  let component: DivergeBarChartComponent;
  let fixture: ComponentFixture<DivergeBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivergeBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivergeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
