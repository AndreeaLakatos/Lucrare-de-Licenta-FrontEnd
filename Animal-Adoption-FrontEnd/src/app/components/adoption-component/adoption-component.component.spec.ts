import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionComponentComponent } from './adoption-component.component';

describe('AdoptionComponentComponent', () => {
  let component: AdoptionComponentComponent;
  let fixture: ComponentFixture<AdoptionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
