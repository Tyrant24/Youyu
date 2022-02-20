import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendang3Component } from './wendang3.component';

describe('Wendang3Component', () => {
  let component: Wendang3Component;
  let fixture: ComponentFixture<Wendang3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendang3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendang3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
