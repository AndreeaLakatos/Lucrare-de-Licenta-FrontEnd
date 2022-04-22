import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionAnnouncesListComponent } from './adoption-announces-list.component';

describe('AdoptionAnnouncesListComponent', () => {
  let component: AdoptionAnnouncesListComponent;
  let fixture: ComponentFixture<AdoptionAnnouncesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionAnnouncesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionAnnouncesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
