import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordAtuacaoProfissionalIndexComponent } from './coord-atuacao-profissional-index.component';

describe('CoordEgressoIndexComponent', () => {
  let component: CoordAtuacaoProfissionalIndexComponent;
  let fixture: ComponentFixture<CoordAtuacaoProfissionalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordAtuacaoProfissionalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordAtuacaoProfissionalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
