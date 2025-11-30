import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingCards } from './missing-cards';

describe('MissingCards', () => {
  let component: MissingCards;
  let fixture: ComponentFixture<MissingCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
