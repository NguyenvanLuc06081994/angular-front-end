import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BNewComponent } from './b-new.component';

describe('BNewComponent', () => {
  let component: BNewComponent;
  let fixture: ComponentFixture<BNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
