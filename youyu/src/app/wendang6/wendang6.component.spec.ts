import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendang6Component } from './wendang6.component';

describe('Wendang6Component', () => {
  let component: Wendang6Component;
  let fixture: ComponentFixture<Wendang6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendang6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendang6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
