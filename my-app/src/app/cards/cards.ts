import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import TCGdex from '@tcgdex/sdk'

const tcgdex = new TCGdex('en');

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})

export class Cards {
  carte: any[] = [];

}
