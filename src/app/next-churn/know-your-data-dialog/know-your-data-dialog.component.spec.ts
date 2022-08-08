import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowYourDataDialogComponent } from './know-your-data-dialog.component';

describe('KnowYourDataDialogComponent', () => {
  let component: KnowYourDataDialogComponent;
  let fixture: ComponentFixture<KnowYourDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowYourDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowYourDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
