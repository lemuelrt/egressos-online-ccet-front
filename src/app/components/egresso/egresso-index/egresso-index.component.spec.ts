import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgressoIndexComponent } from './egresso-index.component';

describe('EgressoIndexComponent', () => {
  let component: EgressoIndexComponent;
  let fixture: ComponentFixture<EgressoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgressoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgressoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
