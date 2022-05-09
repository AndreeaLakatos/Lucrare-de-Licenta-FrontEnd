import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdoptionRequestListComponent } from './user-adoption-request-list.component';

describe('UserAdoptionRequestListComponent', () => {
  let component: UserAdoptionRequestListComponent;
  let fixture: ComponentFixture<UserAdoptionRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdoptionRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdoptionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
