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
      return this.sanitizer.bypassSecurityTrustHtml('<span style=color:green>'+value+'(+1)</span>');
    }
    return this.sanitizer.bypassSecurityTrustHtml("");
  }
}