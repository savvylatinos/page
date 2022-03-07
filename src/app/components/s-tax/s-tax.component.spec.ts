import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { STaxComponent } from './s-tax.component';

describe('STaxComponent', () => {
  let component: STaxComponent;
  let fixture: ComponentFixture<STaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(STaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
