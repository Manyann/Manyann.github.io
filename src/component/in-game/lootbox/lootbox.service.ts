import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

// Interfaces
export interface LootItem {
  id?: number;
  name: string;
  rarity: ItemRarity;
}

export type ItemRarity = 'perave' | 'qualite' | 'artisant' | 'mythique' | 'legendaire';

// Service pour la gestion du loot
export class LootService {
  private readonly STORAGE_KEY = 'csgo-inventory';
  
  private readonly items: Record<ItemRarity, LootItem[]> = {
    perave: [
      { name: 'Pistolet', rarity: 'perave' },
      { name: 'Arc',rarity: 'perave' },
      { name: 'Epée', rarity: 'perave' }
    ],
    qualite: [
      { name: 'Pistolet de qualité correcte', rarity: 'qualite' },
      { name: 'Arc de qualité correcte', rarity: 'qualite' },
      { name: 'Epée de qualité correcte',rarity: 'qualite' }
    ],
    artisant: [
      { name: 'Pistolet d artisant renommé',rarity: 'artisant' },
      { name: 'Arc d artisant renommé',rarity: 'artisant' },
      { name: 'Epée d artisant renommé', rarity: 'artisant' }
    ],
    mythique: [
      { name: 'Pistolet perforant',rarity: 'mythique' },
      { name: 'Arc d ygdrasil',rarity: 'mythique' },
      { name: 'Epée de dueliste',  rarity: 'mythique' }
    ],
    legendaire: [
      { name: '???', rarity: 'legendaire' },
    ]
  };

  private readonly rarityWeights: Record<ItemRarity, number> = {
    perave: 70,
    qualite: 20,
    artisant: 7,
    mythique: 2.5,
    legendaire: 0.5
  };

  getRandomItem(): LootItem {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, weight] of Object.entries(this.rarityWeights)) {
      cumulative += weight;
      if (random <= cumulative) {
        const rarityItems = this.items[rarity as ItemRarity];
        const selectedItem = rarityItems[Math.floor(Math.random() * rarityItems.length)];
        return {
          ...selectedItem,
          id: Date.now() + Math.random()
        };
      }
    }
    return { ...this.items.perave[0], id: Date.now() };
  }

  generateRouletteItems(count: number = 50): LootItem[] {
    return Array.from({ length: count }, () => this.getRandomItem());
  }

  saveInventory(inventory: LootItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(inventory));
    }
  }

  loadInventory(): LootItem[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }

  getRarityClass(rarity: ItemRarity): string {
    return `rarity-${rarity}`;
  }

  isRareItem(rarity: ItemRarity): boolean {
    return ['mythique', 'legendaire'].includes(rarity);
  }
}