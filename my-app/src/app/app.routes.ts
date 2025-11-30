import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { Decks } from './decks/decks';
import { MissingCards } from './missing-cards/missing-cards';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cards', component: Cards },
  { path: 'decks', component: Decks },
  { path: 'missing-cards', component: MissingCards },
  { path: '**', redirectTo: 'home' }
];