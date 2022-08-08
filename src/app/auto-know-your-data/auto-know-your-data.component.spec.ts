import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoKnowYourDataComponent } from './auto-know-your-data.component';

describe('AutoKnowYourDataComponent', () => {
  let component: AutoKnowYourDataComponent;
  let fixture: ComponentFixture<AutoKnowYourDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoKnowYourDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoKnowYourDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
