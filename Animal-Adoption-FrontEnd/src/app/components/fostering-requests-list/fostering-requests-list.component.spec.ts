import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringRequestsListComponent } from './fostering-requests-list.component';

describe('FosteringRequestsListComponent', () => {
  let component: FosteringRequestsListComponent;
  let fixture: ComponentFixture<FosteringRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringRequestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
