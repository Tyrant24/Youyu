import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WendangComponent } from './wendang.component';

describe('WendangComponent', () => {
  let component: WendangComponent;
  let fixture: ComponentFixture<WendangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WendangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WendangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
