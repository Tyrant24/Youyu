import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendang4Component } from './wendang4.component';

describe('Wendang4Component', () => {
  let component: Wendang4Component;
  let fixture: ComponentFixture<Wendang4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendang4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendang4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
