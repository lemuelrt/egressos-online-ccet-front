import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordAtuacaoProfissionalFormComponent } from './coord-atuacao-profissional-form.component';

describe('CoordAtuacaoProfissionalFormComponent', () => {
  let component: CoordAtuacaoProfissionalFormComponent;
  let fixture: ComponentFixture<CoordAtuacaoProfissionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordAtuacaoProfissionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordAtuacaoProfissionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
