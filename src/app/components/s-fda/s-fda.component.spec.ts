import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SFdaComponent } from './s-fda.component';

describe('SFdaComponent', () => {
  let component: SFdaComponent;
  let fixture: ComponentFixture<SFdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SFdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SFdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
