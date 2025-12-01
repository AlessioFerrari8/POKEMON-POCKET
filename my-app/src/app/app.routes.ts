import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { Decks } from './decks/decks';
import { MissingCards } from './missing-cards/missing-cards';
import { ExpansionDetail } from './expansion-detail/expansion-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cards', component: Cards },
  { path: 'decks', component: Decks },
  { path: 'missing-cards', component: MissingCards },
  { path: 'expansion/:id', component: ExpansionDetail },
  { path: '**', redirectTo: 'home' }
];