import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderTypeComponent } from './edit-order-type.component';

describe('EditOrderTypeComponent', () => {
  let component: EditOrderTypeComponent;
  let fixture: ComponentFixture<EditOrderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
