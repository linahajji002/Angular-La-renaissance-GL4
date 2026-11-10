import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PRODUCTS } from './product.data';

@Component({
  selector: 'app-products-filter',
  imports: [],
  templateUrl: './products-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './products-filter.component.css',
})
export class ProductsFilterComponent {
  protected readonly products = PRODUCTS;
  protected readonly categories = [
    ...new Set(this.products.map((product) => product.category)),
  ];
  protected readonly search = signal('');
  protected readonly category = signal('');
  protected readonly filteredProducts = computed(() => {
    const search = this.search().trim().toLowerCase();
    const category = this.category();

    return this.products.filter(
      (product) =>
        (!category || product.category === category) &&
        (!search || product.name.toLowerCase().includes(search)),
    );
  });

  protected updateSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected updateCategory(event: Event): void {
    this.category.set((event.target as HTMLSelectElement).value);
  }

  protected reset(): void {
    this.search.set('');
    this.category.set('');
  }
}
