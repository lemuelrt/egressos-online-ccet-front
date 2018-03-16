import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordEgressosImportComponent } from './coord-egressos-import.component';

describe('CoordEgressosImportComponent', () => {
  let component: CoordEgressosImportComponent;
  let fixture: ComponentFixture<CoordEgressosImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordEgressosImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordEgressosImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
