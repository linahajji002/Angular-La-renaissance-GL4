import { Directive, signal } from '@angular/core';

@Directive({
  // Only created on <input> elements, ignored everywhere else.
  selector: 'input[appRainbow]',
  // The host property replaces @HostBinding and @HostListener.
  host: {
    '[style.color]': 'color()',
    '[style.borderColor]': 'color()',
    '(keyup)': 'onKeyUp()',
  },
})
export class RainbowDirective {
  // One signal is enough: the text and the border always share the same color.
  color = signal('black');

  onKeyUp() {
    this.color.set(this.getRandomColor());
  }

  /**
   * Returns a random hexadecimal color, for example "#3fa9c2"
   */
  private getRandomColor(): string {
    const value = Math.floor(Math.random() * 0x1000000);
    return '#' + value.toString(16).padStart(6, '0');
  }
}