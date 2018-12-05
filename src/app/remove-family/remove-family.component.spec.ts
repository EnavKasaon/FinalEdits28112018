import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFamilyComponent } from './remove-family.component';

describe('RemoveFamilyComponent', () => {
  let component: RemoveFamilyComponent;
  let fixture: ComponentFixture<RemoveFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
