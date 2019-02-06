import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesReportComponent } from './families-report.component';

describe('FamiliesReportComponent', () => {
  let component: FamiliesReportComponent;
  let fixture: ComponentFixture<FamiliesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
