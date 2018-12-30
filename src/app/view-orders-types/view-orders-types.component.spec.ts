import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersTypesComponent } from './view-orders-types.component';

describe('ViewOrdersTypesComponent', () => {
  let component: ViewOrdersTypesComponent;
  let fixture: ComponentFixture<ViewOrdersTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdersTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdersTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
