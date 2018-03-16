import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordEgressoIndexComponent } from './coord-egresso-index.component';

describe('CoordEgressoIndexComponent', () => {
  let component: CoordEgressoIndexComponent;
  let fixture: ComponentFixture<CoordEgressoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordEgressoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordEgressoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
