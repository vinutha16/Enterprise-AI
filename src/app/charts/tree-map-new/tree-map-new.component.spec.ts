import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapNewComponent } from './tree-map-new.component';

describe('TreeMapNewComponent', () => {
  let component: TreeMapNewComponent;
  let fixture: ComponentFixture<TreeMapNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeMapNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
