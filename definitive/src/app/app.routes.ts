import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Decks } from './decks/decks';
import { Cards } from './cards/cards';
import { Wishlist } from './wishlist/wishlist';

export const routes: Routes = [
    { path : '', redirectTo: 'home', pathMatch: 'full'},
    { path : 'home', component: Home },
    { path : 'decks', component: Decks},
    { path : 'cards', component: Cards},
    { path : 'wishlist', component: Wishlist},
    { path: '**', redirectTo: 'home' }, // url non definiti
];


