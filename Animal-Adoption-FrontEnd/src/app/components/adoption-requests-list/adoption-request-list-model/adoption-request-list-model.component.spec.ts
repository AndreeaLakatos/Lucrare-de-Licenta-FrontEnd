import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRequestListModelComponent } from './adoption-request-list-model.component';

describe('AdoptionRequestListModelComponent', () => {
  let component: AdoptionRequestListModelComponent;
  let fixture: ComponentFixture<AdoptionRequestListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionRequestListModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionRequestListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
