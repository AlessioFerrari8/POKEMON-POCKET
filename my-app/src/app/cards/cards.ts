import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import TCGdex, { Query } from '@tcgdex/sdk';

const tcgdex = new TCGdex('en');

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})

export class Cards {
  pokemonCards: any[] = [];
  private cachedResults = new Map<string, any[]>();

  async trovaPokemon(nomePokemon: string): Promise<void> {
    // Controlla la cache
    if (this.cachedResults.has(nomePokemon)) {
      this.pokemonCards = this.cachedResults.get(nomePokemon)!;
      return;
    }

    const cards = await tcgdex.card.list(
      Query.create()
      .equal('name', nomePokemon)
      .greaterOrEqualThan('hp', 60)  // HP >= 60
      .sort('localId', 'ASC')  // Sort by ID ascending
    );
    
    // Limita a 12 risultati
    const limitedCards = cards.slice(0, 12);
    
    // Aggiungi l'URL dell'immagine ad ogni carta
    const cardsWithImages = limitedCards.map((card: any) => ({
      ...card,
      imageUrl: card.getImageURL('low', 'webp')
    }));

    // Salva nella cache
    this.cachedResults.set(nomePokemon, cardsWithImages);
    this.pokemonCards = cardsWithImages;
  }

  async getRandomCard(): Promise<void> {
    const randomCard = await tcgdex.random.card();
    
    this.pokemonCards = [{
      ...randomCard,
      imageUrl: randomCard.getImageURL('high', 'png')
    }];
  }

}
