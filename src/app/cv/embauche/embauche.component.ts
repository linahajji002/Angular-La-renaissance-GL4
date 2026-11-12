import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';
import { CvSharedModule } from '../cv-shared.module';

@Component({
  selector: 'app-embauche',
  standalone: true,
  imports: [CommonModule, CvSharedModule],
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
})
export class EmbaucheComponent {
  public embauchees: Cv[] = [];
  constructor(private embaucheService: EmbaucheService) {
    this.embauchees = this.embaucheService.getEmbauchees();
  }
}