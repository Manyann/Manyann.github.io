import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hero',
  standalone: true
})
export class HeroPipe implements PipeTransform {
  constructor() {}

    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.code_joueur == filter);
    }
}