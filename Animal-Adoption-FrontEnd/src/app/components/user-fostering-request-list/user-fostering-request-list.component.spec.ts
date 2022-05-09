import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFosteringRequestListComponent } from './user-fostering-request-list.component';

describe('UserFosteringRequestListComponent', () => {
  let component: UserFosteringRequestListComponent;
  let fixture: ComponentFixture<UserFosteringRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFosteringRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFosteringRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
