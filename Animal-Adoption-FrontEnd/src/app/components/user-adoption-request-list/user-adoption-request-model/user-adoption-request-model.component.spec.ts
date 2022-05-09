import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdoptionRequestModelComponent } from './user-adoption-request-model.component';

describe('UserAdoptionRequestModelComponent', () => {
  let component: UserAdoptionRequestModelComponent;
  let fixture: ComponentFixture<UserAdoptionRequestModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdoptionRequestModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdoptionRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
