import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDunsComponent } from './s-duns.component';

describe('SDunsComponent', () => {
  let component: SDunsComponent;
  let fixture: ComponentFixture<SDunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
