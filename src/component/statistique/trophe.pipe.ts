import { Pipe, PipeTransform } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Trophe } from '../../app/services/statistiques.service';

@Pipe({
  name: 'trophes',
  standalone: true
})
export class TrophesPipe implements PipeTransform {
  constructor() {}

    transform(trophes : Trophe[]): any {
        let total = trophes.length;
        let own = trophes.filter(x=>x.possede).length;
        return `Trophés ( ${own} / ${total} )`;
    }
}