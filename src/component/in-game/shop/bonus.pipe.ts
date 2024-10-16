import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'bonusAd',
  standalone: true
})
export class BonusAdPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine : string): SafeHtml  {

    if(origine === "elfe"){
      return this.sanitizer.bypassSecurityTrustHtml(value+'<span style=color:gold>(+1)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusForce',
  standalone: true
})
export class BonusForcePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine : string): SafeHtml  {

    if(origine === "orc"){
      return this.sanitizer.bypassSecurityTrustHtml(value+'<span style=color:green>(+1)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusRupture',
  standalone: true
})
export class BonusRupturePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine : string): SafeHtml  {

    if(origine === "nain" && value != "*"){
      return this.sanitizer.bypassSecurityTrustHtml(value+'<span style=color:orange>(-1)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusDegat',
  standalone: true
})
export class BonusDegatPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine : string): SafeHtml  {

    if(origine === "homme-sable"){
      return this.sanitizer.bypassSecurityTrustHtml(value+'<span style=color:cyan>(+1)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'bonusInfo',
  standalone: true
})
export class BonusInfoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, origine : string): SafeHtml  {

    if(origine === "pirate"){
      return this.sanitizer.bypassSecurityTrustHtml(value+'<span style=color:red>(+10% po au loot)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}