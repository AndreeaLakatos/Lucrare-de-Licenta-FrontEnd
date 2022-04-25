import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdoptionAnnouncementComponent } from './add-adoption-announcement.component';

describe('AddAdoptionAnnouncementComponent', () => {
  let component: AddAdoptionAnnouncementComponent;
  let fixture: ComponentFixture<AddAdoptionAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdoptionAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdoptionAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
