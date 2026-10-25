import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  // "input[appRainbow]": the directive is only created on <input> elements.
  // Put appRainbow on a <div> and Angular simply ignores it.
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  // Binds this property to the host element's style.color
  @HostBinding('style.color') color = 'black';
  // Binds this property to the host element's style.borderColor
  @HostBinding('style.borderColor') borderColor = 'black';

  // Runs every time a key is released inside the input
  @HostListener('keyup') onKeyUp() {
    const newColor = this.getRandomColor();
    this.color = newColor;
    this.borderColor = newColor;
  }

  /**
   * Returns a random hexadecimal color, for example "#3fa9c2"
   */
  private getRandomColor(): string {
    // 0x1000000 = 16777216 possible colors (#000000 to #ffffff)
    const value = Math.floor(Math.random() * 0x1000000);
    // toString(16) writes it in base 16, padStart keeps 6 digits ("#00ab12")
    return '#' + value.toString(16).padStart(6, '0');
  }
}