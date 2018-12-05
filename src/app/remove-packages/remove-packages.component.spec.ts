import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePackagesComponent } from './remove-packages.component';

describe('RemovePackagesComponent', () => {
  let component: RemovePackagesComponent;
  let fixture: ComponentFixture<RemovePackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
