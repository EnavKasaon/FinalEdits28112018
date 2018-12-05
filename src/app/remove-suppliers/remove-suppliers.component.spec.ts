import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSuppliersComponent } from './remove-suppliers.component';

describe('RemoveSuppliersComponent', () => {
  let component: RemoveSuppliersComponent;
  let fixture: ComponentFixture<RemoveSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
