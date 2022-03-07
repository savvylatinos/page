import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SCorpComponent } from './s-corp.component';

describe('SCorpComponent', () => {
  let component: SCorpComponent;
  let fixture: ComponentFixture<SCorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SCorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
