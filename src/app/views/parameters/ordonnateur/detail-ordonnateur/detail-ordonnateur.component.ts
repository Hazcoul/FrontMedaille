import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IOrdonnateur } from 'src/app/entities/ordonnateur.model';

@Component({
  selector: 'app-detail-ordonnateur',
  templateUrl: './detail-ordonnateur.component.html',
  styleUrl: './detail-ordonnateur.component.scss'
})
export class DetailOrdonnateurComponent implements OnInit {

  ordonnateur!: IOrdonnateur;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.ordonnateur.debutMandat = moment(this.ordonnateur.debutMandat).format('DD/MM/yyyy');
    this.ordonnateur.finMandat = moment(this.ordonnateur.finMandat).isValid() ? moment(this.ordonnateur.finMandat).format('DD/MM/yyyy') : '';
}

  close(): void {
    this.activeModal.close();
  }
}
