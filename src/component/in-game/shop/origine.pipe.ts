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
        color = "green";
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

    let prix = value;

    switch(origine){
      case "elfe" :
        prix *= 1.25;
          break;
    }
    
    return prix;
  }
}