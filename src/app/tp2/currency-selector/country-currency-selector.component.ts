import { Component, computed, linkedSignal, signal } from '@angular/core';
import { countries } from '../data/countries';

@Component({
  selector: 'app-country-currency-selector',
  imports: [],
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css',
})
export class CountryCurrencySelectorComponent {
  protected readonly countries = countries;
  protected readonly selectedCountry = signal(countries[0]);
  protected readonly acceptedCurrencies = computed(
    () => this.selectedCountry().acceptedCurrencies,
  );
  protected readonly selectedCurrency = linkedSignal<string[], string>({
    source: this.acceptedCurrencies,
    computation: (currencies, previous) =>
      previous?.value && currencies.includes(previous.value)
        ? previous.value
        : currencies[0],
  });

  protected selectCountry(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const country = this.countries.find(
      (candidate) => candidate.name === select.value,
    );

    if (country) {
      this.selectedCountry.set(country);
    }
  }

  protected selectCurrency(event: Event): void {
    this.selectedCurrency.set((event.target as HTMLSelectElement).value);
  }
}
