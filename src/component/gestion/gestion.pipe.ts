import { Pipe, PipeTransform } from '@angular/core';
import { DocumentData } from 'firebase/firestore';

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

@Pipe({
  name: 'heroType',
  standalone: true
})
export class HeroTypePipe implements PipeTransform {
  constructor() {}

    transform(heroTypeCode: string, types: DocumentData[]): any {
        let data =  types.find(x => x['code'] == heroTypeCode);
        if(data == undefined){
          return "";
        }
        return data['libelle'] ?? "";
    }
}

@Pipe({
  name: 'isFromSession',
  standalone: true
})
export class IsFromSessionPipe implements PipeTransform {
  constructor() {}

    transform(items: any[]): any {
      if (!items) {
          return items;
      }
      return items.filter(item => item.actif);
    }
}

@Pipe({
  name: 'shouldBeEquipe',
  standalone: true
})
export class ShouldBeEquipePipe implements PipeTransform {
  constructor() {}

    transform(items: any[], shouldBe:boolean): any {
      return items.filter(item => item['equipe'] == shouldBe);
    }
}