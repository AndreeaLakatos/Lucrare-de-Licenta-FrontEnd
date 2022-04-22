import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringComponentComponent } from './fostering-component.component';

describe('FosteringComponentComponent', () => {
  let component: FosteringComponentComponent;
  let fixture: ComponentFixture<FosteringComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
