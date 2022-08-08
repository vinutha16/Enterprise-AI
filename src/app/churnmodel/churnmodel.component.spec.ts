import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurnmodelComponent } from './churnmodel.component';

describe('ChurnmodelComponent', () => {
  let component: ChurnmodelComponent;
  let fixture: ComponentFixture<ChurnmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChurnmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurnmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
