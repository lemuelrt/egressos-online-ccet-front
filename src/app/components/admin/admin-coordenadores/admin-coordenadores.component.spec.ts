import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoordenadoresComponent } from './admin-coordenadores.component';

describe('AdminCoordenadoresComponent', () => {
  let component: AdminCoordenadoresComponent;
  let fixture: ComponentFixture<AdminCoordenadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCoordenadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoordenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
