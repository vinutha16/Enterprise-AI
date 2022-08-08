import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UfileNameChangeDialogComponent } from './ufile-name-change-dialog.component';

describe('UfileNameChangeDialogComponent', () => {
  let component: UfileNameChangeDialogComponent;
  let fixture: ComponentFixture<UfileNameChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UfileNameChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UfileNameChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
