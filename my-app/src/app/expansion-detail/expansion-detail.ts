import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expansion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expansion-detail.html',
  styleUrl: './expansion-detail.css',
})
export class ExpansionDetail implements OnInit {
  expansionId: string = '';
  expansionName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.expansionId = params['id'];
      // Mappa l'ID al nome dell'espansione
      const expansionMap: any = {
        'genetic-apex': 'Genetic Apex',
        'mythical-island': 'Mythical Island',
        'space-time': 'Space-Time Smackdown',
        'triumphant': 'Triumphant Light',
        'shining-revelry': 'Shining Revelry',
        'celestial': 'Celestial Guardians',
        'extradimensional': 'Extradimensional Crisis',
        'eevee-groove': 'Eevee Groove',
        'wisdom-sea': 'Wisdom of Sea and Sky',
        'secluded-springs': 'Secluded Springs',
        'deluxe-ex': 'Deluxe Pack: ex',
        'mega-rising': 'Mega Rising',
      };
      this.expansionName = expansionMap[this.expansionId] || 'Expansion Detail';
    });
  }

  goBack(): void {
    this.router.navigate(['/missing-cards']);
  }
}
