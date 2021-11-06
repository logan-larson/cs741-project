import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEventListComponent } from './independent-event-list.component';

describe('ProgramEventListComponent', () => {
  let component: ProgramEventListComponent;
  let fixture: ComponentFixture<ProgramEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
