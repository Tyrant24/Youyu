import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppeallistComponent } from './appeallist.component';

describe('AppeallistComponent', () => {
  let component: AppeallistComponent;
  let fixture: ComponentFixture<AppeallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppeallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppeallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
