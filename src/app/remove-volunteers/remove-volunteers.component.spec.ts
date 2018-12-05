import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVolunteersComponent } from './remove-volunteers.component';

describe('RemoveVolunteersComponent', () => {
  let component: RemoveVolunteersComponent;
  let fixture: ComponentFixture<RemoveVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
