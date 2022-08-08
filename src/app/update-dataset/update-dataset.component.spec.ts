import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDatasetComponent } from './update-dataset.component';

describe('UpdateDatasetComponent', () => {
  let component: UpdateDatasetComponent;
  let fixture: ComponentFixture<UpdateDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
