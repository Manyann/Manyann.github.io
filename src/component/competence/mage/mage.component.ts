import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceElementaliste,
  competencesMage,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-mage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mage.component.html',
  styleUrls: ['./mage.component.css', '../../../assets/css/competence.css'],
})
export class MageComponent {
  public competences = competencesMage();

  selectedElements: Record<string, boolean> = {
    Eau: false,
    Terre: false,
    Feu: false,
    Air: false,
  };

  elementHierarchie = [
    {
      type: 'Basique',
      groupes: [
        {
          nom: 'Feu',
          elements: ['Feu'],
        },
        {
          nom: 'Eau',
          elements: ['Eau'],
        },
        {
          nom: 'Air',
          elements: ['Air'],
        },
        {
          nom: 'Terre',
          elements: ['Terre'],
        },
      ],
    },

    {
      type: 'Double',
      groupes: [
        {
          nom: 'Vapeur',
          elements: ['Eau', 'Feu'],
        },
        {
          nom: 'Lave',
          elements: ['Terre', 'Feu'],
        },
        {
          nom: 'Foudre',
          elements: ['Air', 'Feu'],
        },
        {
          nom: 'Bois / Végétal',
          elements: ['Terre', 'Eau'],
        },
        {
          nom: 'Poussière',
          elements: ['Terre', 'Air'],
        },
        {
          nom: 'Glace',
          elements: ['Eau', 'Air'],
        },
      ],
    },

    {
      type: 'Triple',
      groupes: [
        {
          nom: 'Brume',
          elements: ['Eau', 'Air', 'Feu'],
        },
        {
          nom: 'Sable',
          elements: ['Air', 'Eau', 'Terre'],
        },
        {
          nom: 'Métal',
          elements: ['Feu', 'Terre', 'Eau'],
        },
        {
          nom: 'Onde',
          elements: ['Air', 'Terre', 'Feu'],
        },
      ],
    },
  ];

  getCompetencesByGroupe(groupe: string): CompetenceElementaliste[] {
    return this.competences.filter((c) => c.branche === groupe);
  }
  getElementClass(element: string): string {
    return element
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '-')
      .replaceAll('/', '')
      .replaceAll("'", '');
  }

  getElementIconPath(element: string): string {
    const icons: Record<string, string> = {
      Feu: 'assets/icons/elements/fire.svg',
      Eau: 'assets/icons/elements/water.svg',
      Air: 'assets/icons/elements/air.svg',
      Terre: 'assets/icons/elements/earth.svg',

      Vapeur: 'assets/icons/elements/steam.svg',
      Lave: 'assets/icons/elements/lava.svg',
      Foudre: 'assets/icons/elements/lightning.svg',
      'Bois / Végétal': 'assets/icons/elements/wood.svg',
      Poussière: 'assets/icons/elements/dust.svg',
      Glace: 'assets/icons/elements/ice.svg',

      Brume: 'assets/icons/elements/mist.svg',
      Sable: 'assets/icons/elements/sand.svg',
      Métal: 'assets/icons/elements/metal.svg',
      Onde: 'assets/icons/elements/wave.svg',
    };

    return icons[element] ?? 'assets/icons/elements/magic.svg';
  }

  get selectedElementList(): string[] {
    return Object.entries(this.selectedElements)
      .filter(([, checked]) => checked)
      .map(([element]) => element);
  }

  get filteredCompetences(): CompetenceElementaliste[] {
    const selected = this.selectedElementList;

    if (selected.length === 0) {
      return [];
    }

    return this.competences.filter((competence) =>
      competence.elements.every((element) => selected.includes(element)),
    );
  }

  isElementActive(element: string): boolean {
    return this.selectedElements[element];
  }

  get elementHierarchieFlat() {
    return this.elementHierarchie.flatMap((tier) => tier.groupes);
  }

  getCompetencesByGroupeFiltered(groupe: string): CompetenceElementaliste[] {
    return this.filteredCompetences.filter((c) => c.branche === groupe);
  }
}
