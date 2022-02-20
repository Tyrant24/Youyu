import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargelistComponent } from './rechargelist.component';

describe('RechargelistComponent', () => {
  let component: RechargelistComponent;
  let fixture: ComponentFixture<RechargelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
