import { MessageService } from "primeng/api";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Toaster{
    constructor(
        private messageService: MessageService,
      ){}

    public  info(
        summary : string,
        icon : string = '',
        lifeInSeconde:number = 3) : void
    {
        this.common(summary,'info',icon,lifeInSeconde);
    }

    public success(
        summary : string,
        icon : string = '',
        lifeInSeconde:number = 3) : void
    {
        this.common(summary,'success',icon,lifeInSeconde);
    }

    public warning(
        summary : string,
        icon : string = '',
        lifeInSeconde:number = 3) : void
    {
        this.common(summary,'warning',icon,lifeInSeconde);
    }

    public danger(
        summary : string,
        icon : string = '',
        lifeInSeconde:number = 3) : void
    {
        this.common(summary,'danger',icon,lifeInSeconde);
    }

    private common(
        summary : string,
        severity : string,
        icon : string,
        lifeInSeconde:number = 3){
        this.messageService.add({
            severity:severity,
            icon: `pi pi-${icon}`,
            closable:true,
            summary:summary,
            life:lifeInSeconde*1000
        });
    }
}