import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRecomendationComponent } from './partner-recomendation.component';

describe('PartnerRecomendationComponent', () => {
  let component: PartnerRecomendationComponent;
  let fixture: ComponentFixture<PartnerRecomendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRecomendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
