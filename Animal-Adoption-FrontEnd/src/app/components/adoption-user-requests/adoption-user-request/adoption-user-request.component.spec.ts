import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionUserRequestComponent } from './adoption-user-request.component';

describe('AdoptionUserRequestComponent', () => {
  let component: AdoptionUserRequestComponent;
  let fixture: ComponentFixture<AdoptionUserRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionUserRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionUserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
