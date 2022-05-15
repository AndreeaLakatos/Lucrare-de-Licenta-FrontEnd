import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoStatisticsComponent } from './ngo-statistics.component';

describe('NgoStatisticsComponent', () => {
  let component: NgoStatisticsComponent;
  let fixture: ComponentFixture<NgoStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
