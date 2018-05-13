/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaFaixaSalarialComponent } from './consulta-faixa-salarial.component';

describe('ConsultaFaixaSalarialComponent', () => {
  let component: ConsultaFaixaSalarialComponent;
  let fixture: ComponentFixture<ConsultaFaixaSalarialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaFaixaSalarialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFaixaSalarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
