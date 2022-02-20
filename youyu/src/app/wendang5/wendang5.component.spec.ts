import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendang5Component } from './wendang5.component';

describe('Wendang5Component', () => {
  let component: Wendang5Component;
  let fixture: ComponentFixture<Wendang5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendang5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendang5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
