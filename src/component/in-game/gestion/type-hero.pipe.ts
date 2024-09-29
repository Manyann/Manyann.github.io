import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeroType } from '../../model/hero';

@Pipe({
  name: 'typeHero',
  standalone: true
})
export class TypeHeroPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, types : Array<HeroType>): string  {
    return types.find(x=>x.code == value)?.libelle??"";
  }
}