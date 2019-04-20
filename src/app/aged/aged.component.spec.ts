import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedComponent } from './aged.component';

describe('AgedComponent', () => {
  let component: AgedComponent;
  let fixture: ComponentFixture<AgedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
