import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatRechargeOrderComponent } from './creat-recharge-order.component';

describe('CreatRechargeOrderComponent', () => {
  let component: CreatRechargeOrderComponent;
  let fixture: ComponentFixture<CreatRechargeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatRechargeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatRechargeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
