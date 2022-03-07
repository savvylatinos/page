import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SArComponent } from './s-ar.component';

describe('SArComponent', () => {
  let component: SArComponent;
  let fixture: ComponentFixture<SArComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SArComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
