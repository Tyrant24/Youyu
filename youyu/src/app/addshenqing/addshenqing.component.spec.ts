import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshenqingComponent } from './addshenqing.component';

describe('AddshenqingComponent', () => {
  let component: AddshenqingComponent;
  let fixture: ComponentFixture<AddshenqingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddshenqingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddshenqingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
