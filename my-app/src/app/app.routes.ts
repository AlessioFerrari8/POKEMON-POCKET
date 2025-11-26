import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { Decks } from './decks/decks';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect a home
  { path: 'home', component: Home },
  { path: 'cards', component: Cards },
  { path: 'decks', component: Decks },
  { path: '**', redirectTo: '/home' } // Gestione route non trovate
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }