import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'promotion',
  standalone: true,
})
export class PromotionPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number): SafeHtml {
    const random = Math.floor(Math.random() * 20);
    let badge = '';

    if (random === 0) {
      value = value * 0.8;
      badge = `<span class="shop-price-badge price-sale-strong">-20%</span>`;
    } else if (random === 1) {
      value = value * 0.9;
      badge = `<span class="shop-price-badge price-sale">-10%</span>`;
    } else if (random === 18) {
      value = value * 1.1;
      badge = `<span class="shop-price-badge price-up">+10%</span>`;
    } else if (random === 19) {
      value = value * 1.2;
      badge = `<span class="shop-price-badge price-up-strong">+20%</span>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(`
      <span class="shop-price-cell">
        <span class="shop-price">${Math.floor(value)}</span>
        ${badge}
      </span>
    `);
  }
}
