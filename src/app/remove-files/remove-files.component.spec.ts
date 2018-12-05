import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFilesComponent } from './remove-files.component';

describe('RemoveFilesComponent', () => {
  let component: RemoveFilesComponent;
  let fixture: ComponentFixture<RemoveFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
