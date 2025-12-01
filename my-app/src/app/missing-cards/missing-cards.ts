import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missing-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missing-cards.html',
  styleUrl: './missing-cards.css',
})
export class MissingCards {
  constructor(private router: Router) {}  

  expansions = [ // varie espansioni con id
    { name: 'Genetic Apex', id: 'genetic-apex' },
    { name: 'Mythical Island', id: 'mythical-island' },
    { name: 'Space-Time Smackdown', id: 'space-time' },
    { name: 'Triumphant Light', id: 'triumphant' },
    { name: 'Shining Revelry', id: 'shining-revelry' },
    { name: 'Celestial Guardians', id: 'celestial' },
    { name: 'Extradimensional Crisis', id: 'extradimensional' },
    { name: 'Eevee Groove', id: 'eevee-groove' },
    { name: 'Wisdom of Sea and Sky', id: 'wisdom-sea' },
    { name: 'Secluded Springs', id: 'secluded-springs' },
    { name: 'Deluxe Pack: ex', id: 'deluxe-ex' },
    { name: 'Mega Rising', id: 'mega-rising' },
  ];

  selectExpansion(id: string): void { // metodo per selezionare l'interfaccia (Usato nel for)
    this.router.navigate(['/expansion', id]);
  }
}
