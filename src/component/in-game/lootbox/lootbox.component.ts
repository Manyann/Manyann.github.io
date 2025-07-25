import { OnInit, OnDestroy, ViewChild, ElementRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { LootService } from "./lootbox.service";
import { ItemRarity, LootItem } from "../../model/item";
import { InputNumberModule } from "primeng/inputnumber";
import { FormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";

@Component({
  selector: 'app-loot-system',
  standalone: true,
  imports: [CommonModule, InputNumberModule,FormsModule, InputSwitchModule  ],
  providers:[LootService],
  templateUrl: './lootbox.component.html',
  styleUrl: './lootbox.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ])
    ]),
    trigger('bounce', [
      state('normal', style({ transform: 'scale(1)' })),
      state('bounced', style({ transform: 'scale(1.1)' })),
      transition('normal => bounced', animate('200ms ease-in')),
      transition('bounced => normal', animate('200ms ease-out'))
    ])
  ]
})
export class LootboxComponent implements OnInit, OnDestroy {
  
  @ViewChild('roulette', { static: false }) rouletteElement!: ElementRef<HTMLDivElement>;
  @ViewChild('rouletteContainer', { static: false }) rouletteContainer!: ElementRef<HTMLDivElement>;

  // État du composant
  inventory: LootItem[] = [];
  
  // État de l'ouverture
  showModal = false;
  isLoading = false;
  isOpening = false;
  showRoulette = false;
  showResult = false;
  chance = 10;
  includeArmes = false;
  includeArmures = false;
  includePotions = false;
  
  // Roulette
  rouletteItems: LootItem[] = [];
  rouletteOffset = 0;
  wonItem: LootItem | null = null;

  constructor(private lootService: LootService) {}

  ngOnInit(): void {
    this.lootService.interpolateWeights(2);
  }

  ngOnDestroy(): void {
  }


  private resetModalState(): void {
    this.isLoading = false;
    this.showRoulette = false;
    this.showResult = false;
    this.rouletteOffset = 0;
    this.wonItem = null;
  }


  private startRoulette(): void {
    this.isOpening = true;
    this.isLoading = true;
    this.rouletteItems = this.lootService.generateRouletteItems(this.chance,100,this.includeArmes,this.includeArmures,this.includePotions);
    
    // Sélectionner l'objet gagnant (entre les positions 20-30 pour l'effet visuel)
    const winningIndex = Math.floor(Math.random() * 10) + 20;
    this.wonItem = this.rouletteItems[winningIndex];
    
    // Calculer la distance de déplacement
    const itemWidth = 140;
    const containerCenter = 400;
    this.rouletteOffset = -(winningIndex * itemWidth - containerCenter);
    
    // Attendre la fin de l'animation
    const rouletteTimer = setTimeout(() => {
      this.showResult = true;
      this.isOpening = false;
      
      // Créer l'effet de particules pour les objets rares
      if (this.wonItem && this.lootService.isRareItem(this.wonItem.rarity)) {
        this.createParticleEffect();
      }
    }, 4500);
    
  }


  private createParticleEffect(): void {
    // Créer des particules dorées pour les objets rares
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (i / 20) * Math.PI * 2;
      const velocity = 100 + Math.random() * 100;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;
      
      particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, #ffd700, #ffa500);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: explode 2s ease-out forwards;
        --dx: ${dx}px;
        --dy: ${dy}px;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  openAnotherCase(): void {
    this.resetModalState();
    this.startRoulette();
  }

  closeModal(): void {
    this.showModal = false;
    this.resetModalState();
    this.isOpening = false;
  }

  onModalClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  // Utilitaires pour le template
  getRarityClass(rarity: ItemRarity): string {
    return this.lootService.getRarityClass(rarity);
  }

  formatRarity(rarity?: ItemRarity): string {
    if (!rarity) return '';
    return rarity.toUpperCase().replace('-', ' ');
  }

  trackByFn(index: number, item: LootItem): any {
    return item.id || index;
  }

}

// Fournir le service
export const LOOT_PROVIDERS = [
  LootService
];