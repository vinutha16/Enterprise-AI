import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetxlComponent } from './sheetxl.component';

describe('SheetxlComponent', () => {
  let component: SheetxlComponent;
  let fixture: ComponentFixture<SheetxlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetxlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetxlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
