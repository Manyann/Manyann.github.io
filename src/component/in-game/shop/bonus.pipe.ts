import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

function badge(label: string, cssClass: string): string {
  return ` <span class="shop-bonus ${cssClass}">${label}</span>`;
}

@Pipe({
  name: 'bonusAd',
  standalone: true,
})
export class BonusAdPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'elfe') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1', 'bonus-elfe')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusForce',
  standalone: true,
})
export class BonusForcePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'orc') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1', 'bonus-orc')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusArmure',
  standalone: true,
})
export class BonusArmurePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'nain') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1', 'bonus-nain')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusDegat',
  standalone: true,
})
export class BonusDegatPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'homme-sable') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1', 'bonus-sable')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusAttaque',
  standalone: true,
})
export class BonusAttaquePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'samurai') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1', 'bonus-samurai')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusInfo',
  standalone: true,
})
export class BonusInfoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine: string): SafeHtml {
    if (origine === 'pirate') {
      return this.sanitizer.bypassSecurityTrustHtml(
        `${value}${badge('+1 Chance au drop', 'bonus-pirate')}`,
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
