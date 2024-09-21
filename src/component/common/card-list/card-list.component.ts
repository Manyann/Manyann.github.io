import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Card} from '../../model/card';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() public cards: Array<Card>=[];

  @Output() public cardClicked: EventEmitter<string> = new EventEmitter<string>();
  
  public onClick(url:string):void{
    this.cardClicked.emit(url);
  }
}
