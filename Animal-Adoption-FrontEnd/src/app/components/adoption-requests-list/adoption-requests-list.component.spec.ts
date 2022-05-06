import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRequestsListComponent } from './adoption-requests-list.component';

describe('AdoptionRequestsListComponent', () => {
  let component: AdoptionRequestsListComponent;
  let fixture: ComponentFixture<AdoptionRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionRequestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
