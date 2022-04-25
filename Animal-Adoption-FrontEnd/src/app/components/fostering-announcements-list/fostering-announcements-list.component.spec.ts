import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FosteringAnnouncementsListComponent } from './fostering-announcements-list.component';

describe('FosteringAnnouncementsListComponent', () => {
  let component: FosteringAnnouncementsListComponent;
  let fixture: ComponentFixture<FosteringAnnouncementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FosteringAnnouncementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FosteringAnnouncementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
