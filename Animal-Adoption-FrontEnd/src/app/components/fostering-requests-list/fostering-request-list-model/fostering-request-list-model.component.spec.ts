import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringRequestListModelComponent } from './fostering-request-list-model.component';

describe('FosteringRequestListModelComponent', () => {
  let component: FosteringRequestListModelComponent;
  let fixture: ComponentFixture<FosteringRequestListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringRequestListModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringRequestListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
