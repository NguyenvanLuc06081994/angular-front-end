import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BListComponent } from './b-list.component';

describe('BListComponent', () => {
  let component: BListComponent;
  let fixture: ComponentFixture<BListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
