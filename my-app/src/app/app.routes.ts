import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { Decks } from './decks/decks';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cards', component: Cards },
  { path: 'decks', component: Decks },
  { path: '**', redirectTo: 'home' }
];