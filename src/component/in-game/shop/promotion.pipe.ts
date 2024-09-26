import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'promotion',
  standalone: true
})
export class PromotionPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number): SafeHtml  {

    let random = Math.floor(Math.random() * 20);
    let infos = "";

    if(random == 0){
        infos = "<i class='pi pi-angle-double-down' style='color:green' title='"+value+"'></i>";
        value = value * 0.8;
    }
    else if(random ==1 ){
        infos = "<i class='pi pi-angle-double-down' style='color:green' title='"+value+"'></i>";
        value = value * 0.9;
    }
    else if(random == 18){
        infos = "<i class='pi pi-angle-double-up' style='color:red' title='"+value+"'></i>";
        value = value * 1.1;
    }
    else if(random == 19){
        infos = "<i class='pi pi-angle-double-up' style='color:red' title='"+value+"'></i>";
        value = value * 1.2;
    }
    
    return this.sanitizer.bypassSecurityTrustHtml(Math.floor(value) + infos);
  }
}