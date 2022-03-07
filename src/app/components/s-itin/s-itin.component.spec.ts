import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SItinComponent } from './s-itin.component';

describe('SItinComponent', () => {
  let component: SItinComponent;
  let fixture: ComponentFixture<SItinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SItinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SItinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
