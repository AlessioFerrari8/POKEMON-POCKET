import { CommonModule } from '@angular/common';
import { Component, isWritableSignal, signal, WritableSignal } from '@angular/core';
import TCGdex, { Query } from '@tcgdex/sdk';
import { range } from 'rxjs';

const tcgdex = new TCGdex('en');

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css'],
})

export class Cards {
  pokemonCards: any[] = []; // array con le carte trovate
  randomCards: any[] = []; // array per carte random
  posizione: WritableSignal<number> = signal(0);
  private cachedResults = new Map<string, any[]>(); // cache per salvarsi i result

  async trovaPokemon(nomePokemon: string): Promise<void> {
    // Controlla la cache
    if (this.cachedResults.has(nomePokemon)) { // non rifaccio al chiamata
      this.pokemonCards = this.cachedResults.get(nomePokemon)!;
      return;
    }

    const cards = await tcgdex.card.list( // mi faccio l'array con tutte le carte
      Query.create()
      .equal('name', nomePokemon)
      .greaterOrEqualThan('hp', 60)  // HP >= 60
      .sort('localId', 'ASC')  // Sort by ID 
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

  async genRandomCard(): Promise<void> {
    for(let i = 0; i < 10; i++) {
      const randomCard = await tcgdex.random.card();
      this.randomCards.push(randomCard);
      console.log("Nuovo random")
      console.log("Pokemon Caricato ", randomCard.name)
    }
  }

  getRandomCard(): void {
    const randomCard = this.randomCards[this.posizione()];
    this.pokemonCards = [{
      ...randomCard,
      imageUrl: randomCard.getImageURL('low', 'webp')
    }];
    this.posizione.update(valoreVecchio => valoreVecchio + 1);
  }

}
