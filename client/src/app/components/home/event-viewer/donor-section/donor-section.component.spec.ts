import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorSectionComponent } from './donor-section.component';

describe('DonorSectionComponent', () => {
  let component: DonorSectionComponent;
  let fixture: ComponentFixture<DonorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
