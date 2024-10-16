import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'origine',
  standalone: true
})
export class OriginePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml  {
    if(value === "commun")
      return "";

    let color = "";

    switch(value){
      case "elfe" :
        color = "gold";
          break;
      case "nain" :
        color = "orange";
            break;
      case "orc" :
        color = "green";
            break;
      case "pirate" :
        color = "red";
            break;
      case "homme-sable" :
          color = "cyan";
            break;
    }
    
    return this.sanitizer.bypassSecurityTrustHtml('<span style=color:'+color+'>('+value+')</span>');
  }
}


@Pipe({
  name: 'originePrix',
  standalone: true
})
export class OriginePrixPipe implements PipeTransform {

  transform(value: number, origine : string): number  {
    if(origine === "commun")
      return value;
    else
      return value * 1.25;
  }
}