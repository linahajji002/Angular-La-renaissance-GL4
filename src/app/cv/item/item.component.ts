import { Component, ChangeDetectionStrategy, computed, inject, input } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { DefaultImagePipe } from "../pipes/default-image.pipe";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.css"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DefaultImagePipe]
})
export class ItemComponent {
  private cvService = inject(CvService);

  cv = input.required<Cv>();
  size = input(50);

  /** Recalculés seulement quand size ou cv changent */
  imgSize = computed(() => `${this.size()}px`);
  fullName = computed(() => `${this.cv().firstname} ${this.cv().name}`);

  onSelectCv() {
    this.cvService.selectCv(this.cv());
  }
}
