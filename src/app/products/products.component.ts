import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  shareReplay,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { ProductApiResponse } from "./dto/product-api-response.dto";

interface ProductsState {
  products: Product[];
  hasMore: boolean;
}

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);
  private readonly pageSize = 12;

  private readonly settings$ = new BehaviorSubject<Settings>({
    limit: this.pageSize,
    skip: 0,
  });

  private readonly state$: Observable<ProductsState> = this.settings$.pipe(
    // One request per page, in order, never cancelled.
    concatMap((settings) => this.productService.getProducts(settings)),
    // Stop once the last page has arrived (inclusive: keep that last page).
    // Completing unsubscribes from settings$, so later clicks trigger no call.
    takeWhile((response) => this.hasMore(response), true),
    // Accumulate pages into a single list.
    scan(
      (state: ProductsState, response: ProductApiResponse) => ({
        products: [...state.products, ...response.products],
        hasMore: this.hasMore(response),
      }),
      { products: [], hasMore: true }
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  products$: Observable<Product[]> = this.state$.pipe(
    map((state) => state.products)
  );

  hasMore$: Observable<boolean> = this.state$.pipe(
    map((state) => state.hasMore)
  );

  loadMore(): void {
    const { skip, limit } = this.settings$.value;
    this.settings$.next({ limit, skip: skip + limit });
  }

  private hasMore(response: ProductApiResponse): boolean {
    return response.skip + response.products.length < response.total;
  }
}
