import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportDialogComponent } from './view-report-dialog.component';

describe('ViewReportDialogComponent', () => {
  let component: ViewReportDialogComponent;
  let fixture: ComponentFixture<ViewReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
