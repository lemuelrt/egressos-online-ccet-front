import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordEgressoFormComponent } from './coord-egresso-form.component';

describe('CoordEgressoFormComponent', () => {
  let component: CoordEgressoFormComponent;
  let fixture: ComponentFixture<CoordEgressoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordEgressoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordEgressoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
