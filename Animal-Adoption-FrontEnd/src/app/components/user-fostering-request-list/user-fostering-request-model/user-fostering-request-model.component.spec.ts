import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFosteringRequestModelComponent } from './user-fostering-request-model.component';

describe('UserFosteringRequestModelComponent', () => {
  let component: UserFosteringRequestModelComponent;
  let fixture: ComponentFixture<UserFosteringRequestModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFosteringRequestModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFosteringRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
