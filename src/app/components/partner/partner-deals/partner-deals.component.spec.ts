import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDealsComponent } from './partner-deals.component';

describe('PartnerDealsComponent', () => {
  let component: PartnerDealsComponent;
  let fixture: ComponentFixture<PartnerDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
