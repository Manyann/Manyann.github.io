import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'origine',
  standalone: true,
})
export class OriginePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (value === 'commun') {
      return '';
    }

    const labels: Record<string, string> = {
      elfe: 'Elfe',
      nain: 'Nain',
      orc: 'Orc',
      pirate: 'Pirate',
      'homme-sable': 'Homme-sable',
      samurai: 'Samurai',
    };

    const cssClassMap: Record<string, string> = {
      elfe: 'tag-elfe',
      nain: 'tag-nain',
      orc: 'tag-orc',
      pirate: 'tag-pirate',
      'homme-sable': 'tag-sable',
      samurai: 'tag-samurai',
    };

    const label = labels[value] ?? value;
    const cssClass = cssClassMap[value] ?? 'tag-default';

    return this.sanitizer.bypassSecurityTrustHtml(
      ` <span class="shop-tag ${cssClass}">${label}</span>`,
    );
  }
}

@Pipe({
  name: 'originePrix',
  standalone: true,
})
export class OriginePrixPipe implements PipeTransform {
  transform(value: number, origine: string): number {
    if (origine === 'commun') return value;
    if (origine === 'samurai' || origine === 'nain') return value * 1.4;
    if (origine === 'pirate') return value * 0.8;
    return value * 1.2;
  }
}
