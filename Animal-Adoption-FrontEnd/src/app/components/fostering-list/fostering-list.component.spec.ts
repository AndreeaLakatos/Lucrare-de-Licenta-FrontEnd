import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringListComponent } from './fostering-list.component';

describe('FosteringListComponent', () => {
  let component: FosteringListComponent;
  let fixture: ComponentFixture<FosteringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
