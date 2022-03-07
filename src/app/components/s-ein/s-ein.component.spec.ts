import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SEinComponent } from './s-ein.component';

describe('SEinComponent', () => {
  let component: SEinComponent;
  let fixture: ComponentFixture<SEinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SEinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SEinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
