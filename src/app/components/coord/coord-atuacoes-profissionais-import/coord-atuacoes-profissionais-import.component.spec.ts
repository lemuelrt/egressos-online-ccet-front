import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordAtuacoesProfissionaisImportComponent } from './coord-atuacoes-profissionais-import.component';

describe('CoordAtuacoesProfissionaisImportComponent', () => {
  let component: CoordAtuacoesProfissionaisImportComponent;
  let fixture: ComponentFixture<CoordAtuacoesProfissionaisImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordAtuacoesProfissionaisImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordAtuacoesProfissionaisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
