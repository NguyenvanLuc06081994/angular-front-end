import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOldComponent } from './b-old.component';

describe('BOldComponent', () => {
  let component: BOldComponent;
  let fixture: ComponentFixture<BOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
