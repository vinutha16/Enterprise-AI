import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresciptionsComponent } from './presciptions.component';

describe('PresciptionsComponent', () => {
  let component: PresciptionsComponent;
  let fixture: ComponentFixture<PresciptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresciptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresciptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
