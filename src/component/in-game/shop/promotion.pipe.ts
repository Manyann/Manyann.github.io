import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'promotion',
  standalone: true,
})
export class PromotionPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number, promotion: number): SafeHtml {
    if (value === 0) {
      return '';
    }
    let badge = '';

    if (promotion === -20) {
      badge = `<span class="shop-price-badge price-sale-strong">-20%</span>`;
    } else if (promotion === -10) {
      badge = `<span class="shop-price-badge price-sale">-10%</span>`;
    } else if (promotion === 10) {
      badge = `<span class="shop-price-badge price-up">+10%</span>`;
    } else if (promotion === 20) {
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
