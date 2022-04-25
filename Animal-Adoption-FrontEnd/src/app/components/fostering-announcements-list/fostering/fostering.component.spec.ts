import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringComponent } from './fostering.component';

describe('FosteringComponent', () => {
  let component: FosteringComponent;
  let fixture: ComponentFixture<FosteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
