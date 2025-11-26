import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decks } from './decks';

describe('Decks', () => {
  let component: Decks;
  let fixture: ComponentFixture<Decks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
