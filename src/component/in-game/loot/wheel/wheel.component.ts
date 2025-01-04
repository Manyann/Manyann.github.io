import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface LootItem {
  item: string;
  color: string;
  weight: number;
}

@Component({
  selector: 'app-loot-wheel',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.css'
})
export class WheelComponent {

  lootTable: LootItem[]  = [
    { item: 'Pérave', color: 'gray', weight: 70 },
    { item: 'Correcte', color: '#1eff00', weight: 18 },
    { item: 'Rare', color: '#0070dd', weight: 7 },
    { item: 'Epic', color: '#a335ee', weight: 4 },
    { item: 'Légendaire', color: '#ff8000', weight: 1 }
  ];

  totalWeight = this.lootTable.reduce((sum, loot) => sum + loot.weight, 0);
  resultMessage = '';
  spinning = false;

  spinWheel() {
    if (this.spinning) return;

    this.spinning = true;
    const spinAngle = Math.floor(Math.random() * 3600) + 720;
    const finalAngle = spinAngle % 360;

    const wheelElement = document.getElementById('wheel');
    if (wheelElement) {
      wheelElement.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      wheelElement.style.transform = `rotate(${spinAngle}deg)`;
    }

    setTimeout(() => {
      this.spinning = false;
    }, 4000); 
  }
  
  generatePath(index: number): string {
    const centerX = 150;
    const centerY = 150;
    const radius = 150;
  
    const startAngle = this.calculateCumulativeAngle(index);
    const endAngle = startAngle + this.calculateSegmentAngle(index);
  
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
  
    const largeArcFlag = this.calculateSegmentAngle(index) > 180 ? 1 : 0;
  
    return `
      M ${centerX} ${centerY} 
      L ${x1} ${y1} 
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} 
      Z
    `;
  }
  
  calculateSegmentAngle(index: number): number {
    return (this.lootTable[index].weight / this.totalWeight) * 360;
  }
  
  calculateCumulativeAngle(index: number): number {
    return this.lootTable
      .slice(0, index)
      .reduce((sum, loot) => sum + (loot.weight / this.totalWeight) * 360, 0);
  }

  calculateTextPosition(index: number): { x: number, y: number } {
    const centerX = 150;
    const centerY = 150;
    const radius = 100; // Position text closer to the center (adjust this value as needed)

    const startAngle = this.calculateCumulativeAngle(index);
    const endAngle = startAngle + this.calculateSegmentAngle(index);
    const middleAngle = (startAngle + endAngle) / 2;

    // Calculate the position of the text along the middle of the segment
    const x = centerX + radius * Math.cos((middleAngle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((middleAngle * Math.PI) / 180);

    return { x, y };
  }

  calculateTextRotation(index: number): number {
    const startAngle = this.calculateCumulativeAngle(index);
    const endAngle = startAngle + this.calculateSegmentAngle(index);
    const middleAngle = (startAngle + endAngle) / 2;

    // The rotation angle should be the middle angle of the segment
    return middleAngle;
  }
  
}