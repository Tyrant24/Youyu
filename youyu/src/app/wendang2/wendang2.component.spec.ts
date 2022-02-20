import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wendang2Component } from './wendang2.component';

describe('Wendang2Component', () => {
  let component: Wendang2Component;
  let fixture: ComponentFixture<Wendang2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wendang2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wendang2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
