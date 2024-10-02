import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Ville, VilleHelper } from '../../model/villes';
import { FormsModule } from '@angular/forms';
import { Item,Categorie, ItemHelper } from '../../model/item';
import { ButtonModule } from 'primeng/button';
import { CodeLibelle } from '../../model/code-libelle';

@Component({
  selector: 'app-loot',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule],
  templateUrl: './loot.component.html',
  styleUrl: './loot.component.css'
})
export class LootComponent {
  items : Array<Item>;
  luck : number;
  item : Item;
  isOpen :boolean;

  constructor(){
    this.items = ItemHelper.getAll();
    this.luck = 10;
    this.item = ItemHelper.getDefault();
    this.isOpen = false;
  }

  dropItem():void{
    this.item = this.rollSingleLoot(this.luck,this.items);
    this.isOpen = true;
  }

rollSingleLoot(luck: number, lootTable: Item[]): Item  {
  const modifiedLootTable = lootTable.map(loot => {
    return {
          ...loot,
          basePourcentage: this.modifyChance(loot.basePourcentage, luck)
      };
  });

  const totalWeight = modifiedLootTable.reduce((sum, loot) => sum + loot.basePourcentage, 0);

  const roll = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const loot of modifiedLootTable) {
      cumulativeWeight += loot.basePourcentage;
      if (roll <= cumulativeWeight) {
          return loot; 
      }
  }

  return ItemHelper.getDefault(); 
}

modifyChance(baseChance: number, luck: number): number {
  let double = luck %12;
  const modifiedChance = baseChance -50 + (luck - double) + 2*double;
  return Math.min(Math.max(modifiedChance, 0), 100); 
}


}