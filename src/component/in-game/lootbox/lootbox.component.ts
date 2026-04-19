import {
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LootService } from './lootbox.service';
import { ItemRarity, LootItem } from '../../model/item';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-loot-system',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    InputSwitchModule,
    ButtonModule,
  ],
  providers: [LootService],
  templateUrl: './lootbox.component.html',
  styleUrls: [
    '../../../assets/css/layout.css',
    '../../../assets/css/badge.css',
    '../../../assets/css/switch.css',
    './lootbox.component.css',
  ],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('bounce', [
      state('normal', style({ transform: 'scale(1)' })),
      state('bounced', style({ transform: 'scale(1.1)' })),
      transition('normal => bounced', animate('200ms ease-in')),
      transition('bounced => normal', animate('200ms ease-out')),
    ]),
  ],
})
export class LootboxComponent implements OnInit, OnDestroy {
  @ViewChild('roulette', { static: false })
  rouletteElement!: ElementRef<HTMLDivElement>;
  @ViewChild('rouletteContainer', { static: false })
  rouletteContainer!: ElementRef<HTMLDivElement>;

  inventory: LootItem[] = [];

  showModal = false;
  isLoading = false;
  isOpening = false;
  showRoulette = false;
  showResult = false;
  chance = 10;
  includeArmes = true;
  includeArmures = true;
  includePotions = false;
  includeGemmes = false;

  rouletteItems: LootItem[] = [];
  rouletteOffset = 0;
  wonItem: LootItem | null = null;

  constructor(private lootService: LootService) {}

  ngOnInit(): void {
    this.lootService.interpolateWeights(2);
  }

  ngOnDestroy(): void {}

  private resetModalState(): void {
    this.isLoading = false;
    this.showRoulette = false;
    this.showResult = false;
    this.rouletteOffset = 0;
    this.rouletteItems = [];
    this.wonItem = null;
  }

  private startRoulette(): void {
    this.isOpening = true;
    this.isLoading = true;
    this.showRoulette = true;
    this.showResult = false;

    this.rouletteItems = this.lootService.generateRouletteItems(
      this.chance,
      100,
      this.includeArmes,
      this.includeArmures,
      this.includePotions,
      this.includeGemmes,
    );

    const winningIndex = Math.floor(Math.random() * 10) + 20;
    this.wonItem = this.rouletteItems[winningIndex];

    this.rouletteOffset = 0;

    requestAnimationFrame(() => {
      const containerEl = this.rouletteContainer?.nativeElement;
      const rouletteEl = this.rouletteElement?.nativeElement;

      if (!containerEl || !rouletteEl) {
        return;
      }

      const firstItem = rouletteEl.querySelector(
        '.roulette-item',
      ) as HTMLElement | null;
      if (!firstItem) {
        return;
      }

      const containerWidth = containerEl.offsetWidth;
      const itemWidth = firstItem.offsetWidth;

      const selectorCenter = containerWidth / 2;
      const winningItemCenter = winningIndex * itemWidth + itemWidth / 2;

      this.rouletteOffset = selectorCenter - winningItemCenter;
    });

    setTimeout(() => {
      this.showResult = true;
      this.isOpening = false;
      this.isLoading = false;

      if (this.wonItem && this.lootService.isRareItem(this.wonItem.rarity)) {
        this.createParticleEffect();
      }
    }, 4500);
  }

  getCurrentWeights(): { label: string; value: number; className: string }[] {
    const weights = this.lootService.interpolateWeights(this.chance);

    return [
      { label: 'Pérave', value: weights.perave, className: 'rarity-perave' },
      { label: 'Qualité', value: weights.qualite, className: 'rarity-qualite' },
      {
        label: 'Artisant',
        value: weights.artisant,
        className: 'rarity-artisant',
      },
      {
        label: 'Excellence',
        value: weights.excellence,
        className: 'rarity-excellence',
      },
      {
        label: 'Légendaire',
        value: weights.legendaire,
        className: 'rarity-legendaire',
      },
      {
        label: 'Mythique',
        value: weights.mythique,
        className: 'rarity-mythique',
      },
    ];
  }

  private createParticleEffect(): void {
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

export const LOOT_PROVIDERS = [LootService];
