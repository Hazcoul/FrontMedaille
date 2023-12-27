import { Component } from '@angular/core';
import { ILigneSortie, LigneSortie } from 'src/app/entities/ligne-sortie.model';

@Component({
  selector: 'app-add-edit-ligne-sortie',
  templateUrl: './add-edit-ligne-sortie.component.html',
  styleUrl: './add-edit-ligne-sortie.component.scss'
})
export class AddEditLigneSortieComponent {

  ligneSortie: ILigneSortie = new LigneSortie();
}
