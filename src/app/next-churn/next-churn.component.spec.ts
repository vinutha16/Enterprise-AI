import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextChurnComponent } from './next-churn.component';

describe('NextChurnComponent', () => {
  let component: NextChurnComponent;
  let fixture: ComponentFixture<NextChurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextChurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextChurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
