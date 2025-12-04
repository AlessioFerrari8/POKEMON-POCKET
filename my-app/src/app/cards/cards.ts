import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
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
  pokemonCards: any[] = []; // array con le carte trovate
  randomCards: any[] = []; // array per carte random
  posizione: WritableSignal<number> = signal(0);
  isLoading: boolean = false;
  errorMessage: string = '';
  private cachedResults = new Map<string, any[]>();

  async trovaPokemon(nomePokemon: string): Promise<void> {
    if (!nomePokemon.trim()) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Controlla la cache
      if (this.cachedResults.has(nomePokemon.toLowerCase())) {
        this.pokemonCards = this.cachedResults.get(nomePokemon.toLowerCase())!;
        this.isLoading = false;
        return;
      }

      const cards = await tcgdex.card.list(
        Query.create()
          .equal('name', nomePokemon)
          .greaterOrEqualThan('hp', 60)
          .sort('localId', 'ASC')
      );
      
      if (cards.length === 0) {
        this.errorMessage = `Nessuna carta trovata per "${nomePokemon}"`;
        this.pokemonCards = [];
        return;
      }
      
      // Limita a 12 risultati
      const limitedCards = cards.slice(0, 12);
      
      // Aggiungi l'URL dell'immagine ad ogni carta
      const cardsWithImages = limitedCards.map((card: any) => ({
        ...card,
        imageUrl: card.getImageURL('low', 'webp')
      }));

      // Salva nella cache
      this.cachedResults.set(nomePokemon.toLowerCase(), cardsWithImages);
      this.pokemonCards = cardsWithImages;
      console.log(`Carte trovate per "${nomePokemon}":`, cardsWithImages);
    } catch (error) {
      console.error('Errore durante la ricerca:', error);
      this.errorMessage = 'Errore nel caricamento delle carte';
      this.pokemonCards = [];
    } finally {
      this.isLoading = false;
    }
  }

  async genRandomCard(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.randomCards = []; // Resetta l'array
    this.posizione.set(0); // Resetta la posizione

    try {
      for(let i = 0; i < 10; i++) {
        const randomCard = await tcgdex.random.card();
        const cardWithImage = {
          ...randomCard,
          imageUrl: randomCard.getImageURL('low', 'webp')
        };
        this.randomCards.push(cardWithImage);
        console.log("Pokemon Random Caricato:", randomCard.name);
      }
      
      // Mostra immediatamente la prima carta random
      if (this.randomCards.length > 0) {
        this.showCurrentRandomCard();
      }
    } catch (error) {
      console.error('Errore nel caricamento carte random:', error);
      this.errorMessage = 'Errore nel caricamento delle carte random';
    } finally {
      this.isLoading = false;
    }
  }

  getRandomCard(): void {
    // Controlla se ci sono carte caricate
    if (this.randomCards.length === 0) {
      this.errorMessage = 'Prima carica le carte random con "Genera Random"';
      return;
    }

    // Controlla se siamo alla fine dell'array
    if (this.posizione() >= this.randomCards.length) {
      this.errorMessage = 'Hai visto tutte le carte random! Generane altre.';
      this.posizione.set(0); // Reset o gestisci come preferisci
      return;
    }

    // Mostra la carta corrente e incrementa
    this.showCurrentRandomCard();
    this.posizione.update(valoreVecchio => valoreVecchio + 1);
  }

  private showCurrentRandomCard(): void {
    const currentCard = this.randomCards[this.posizione()];
    this.pokemonCards = [currentCard];
    this.errorMessage = '';
    
    console.log(`Mostrando carta ${this.posizione() + 1}/${this.randomCards.length}:`, currentCard.name);
  }

  // Metodo per tornare indietro
  previousCard(): void {
    if (this.randomCards.length === 0) return;
    
    const newPosition = this.posizione() - 2; // -2 perché getRandomCard incrementa dopo
    if (newPosition >= 0) {
      this.posizione.set(newPosition);
      this.showCurrentRandomCard();
    }
  }

  // Metodo per resettare
  resetRandom(): void {
    this.randomCards = [];
    this.posizione.set(0);
    this.pokemonCards = [];
    this.errorMessage = '';
  }
}