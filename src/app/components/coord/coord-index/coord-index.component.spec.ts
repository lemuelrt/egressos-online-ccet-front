import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordIndexComponent } from './coord-index.component';

describe('CoordIndexComponent', () => {
  let component: CoordIndexComponent;
  let fixture: ComponentFixture<CoordIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
