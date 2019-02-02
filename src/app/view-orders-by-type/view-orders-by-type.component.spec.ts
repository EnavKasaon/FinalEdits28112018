import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersByTypeComponent } from './view-orders-by-type.component';

describe('ViewOrdersByTypeComponent', () => {
  let component: ViewOrdersByTypeComponent;
  let fixture: ComponentFixture<ViewOrdersByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdersByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdersByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
