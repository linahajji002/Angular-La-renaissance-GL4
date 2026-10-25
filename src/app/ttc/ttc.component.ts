import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  // State: the 3 values the user can change (writable signals with their default values)
  price = signal(0);
  quantity = signal(1);
  tva = signal(18);

  // Derived values: recalculated automatically when price, quantity or tva change
  unitPriceTtc = computed(() => this.price() * (1 + this.tva() / 100));

  discountRate = computed(() => {
    const quantity = this.quantity();
    if (quantity > 15) return 0.3;
    if (quantity >= 10) return 0.2;
    return 0;
  });

  totalBeforeDiscount = computed(() => this.unitPriceTtc() * this.quantity());

  discountAmount = computed(() => this.totalBeforeDiscount() * this.discountRate());

  totalTtc = computed(() => this.totalBeforeDiscount() - this.discountAmount());
}
