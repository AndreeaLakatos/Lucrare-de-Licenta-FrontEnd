import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFosteringAnnouncementComponent } from './add-fostering-announcement.component';

describe('AddFosteringAnnouncementComponent', () => {
  let component: AddFosteringAnnouncementComponent;
  let fixture: ComponentFixture<AddFosteringAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFosteringAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFosteringAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
