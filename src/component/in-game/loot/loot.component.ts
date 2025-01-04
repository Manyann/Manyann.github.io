import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { WheelComponent } from './wheel/wheel.component';

@Component({
  selector: 'app-loot',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule, WheelComponent],
  templateUrl: './loot.component.html',
  styleUrl: './loot.component.css'
})
export class LootComponent {

}