import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecomendationComponent } from './create-recomendation.component';

describe('CreateRecomendationComponent', () => {
  let component: CreateRecomendationComponent;
  let fixture: ComponentFixture<CreateRecomendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecomendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
