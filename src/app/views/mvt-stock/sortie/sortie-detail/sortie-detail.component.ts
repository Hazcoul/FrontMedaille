import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ISortie } from 'src/app/entities/sortie.model';
import { ReferentialService } from 'src/app/services/referential.service';
import { SortieService } from 'src/app/services/sortie.service';
import Swal from 'sweetalert2';
import { RejeterSortieComponent } from '../rejeter-sortie/rejeter-sortie.component';
import { ValiderSortieComponent } from '../valider-sortie/valider-sortie.component';
import { IPieceJointe } from 'src/app/entities/piece-jointe.model';

@Component({
  selector: 'app-sortie-detail',
  templateUrl: './sortie-detail.component.html',
  styleUrl: './sortie-detail.component.scss'
})
export class SortieDetailComponent implements OnInit {

  referentials: any;
  sortie: ISortie | null = null;
  active = 1;
  pieceJointes?: IPieceJointe[];
  valide="VALIDE_MVT";

  constructor(
    private sortieService: SortieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private referentialService: ReferentialService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
     /**
     * Get all referentials
     */
     this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
      },
      error: (e) => console.log('ERROR : ', e)
    })
    
    this.activatedRoute.data.subscribe(({sortie}) =>{
      console.log('SORTIE RESOLVE : ', sortie.body);
      this.sortie = sortie.body;
      this.sortie!.dateSortie = moment(this.sortie?.dateSortie).format('DD/MM/yyyy');
    })

    if(this.sortie && this.sortie.idSortie) {
      this.getAllPjForSortie(this.sortie.idSortie);
    }
    
  }

  /**
     * Get all pj for given sortie
     */
  getAllPjForSortie(id: number) {
    this.referentialService.getAllPieceJointes(id, 'sortie').subscribe({
      next: (res: HttpResponse<IPieceJointe[]>) => {
        this.pieceJointes = res.body || [];
        console.log('PIECE_JOINTES_G ', this.pieceJointes);
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  onPrevisualizePj(pieceJointe: IPieceJointe){
    var binaryString = atob(pieceJointe.fileBase64Content!);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    let file = new Blob([bytes], { type: 'application/pdf' });            
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  goBack(): void {
    this.router.navigate(['/mouvement/sortie']);
  }

  generateEtat(id: number, format: string) {
    this.sortieService.generateEtat(id, format).subscribe({
      next: response => {
        console.log(response);
        if (response !== null) {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  valider(sortie: ISortie): void {
    const modalRef = this.modalService.open(ValiderSortieComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.numSortie = sortie.numeroSortie;
    modalRef.result.then((format) => {
      this.sortieService.valider(sortie.idSortie!).subscribe({
        next: (res) => {
          if(res.body && 'msg' in res.body) {
            const msg = '' + res.body.msg;
            Swal.fire({
              icon: "error",
              title: "Désolé!",
              text: msg,
            });
          } else {
            this.generateEtat(sortie.idSortie!, format);
            this.goBack();
          }
        },
        error: (e) => console.log('ERROR : ', e)
      })
    },
      error => console.log(error)
    )
  }

  rejeter(sortie: ISortie): void {
    const modalRef = this.modalService.open(RejeterSortieComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.numSortie = sortie.numeroSortie;
    modalRef.result.then((comment) => {
        sortie.description = comment;
        console.log('REJET : ', sortie)
        this.sortieService.rejeter(sortie.idSortie!, comment).subscribe({
          next: (res) => {
            if(res.body && 'msg' in res.body) {
              const msg = '' + res.body.msg;
              Swal.fire({
                icon: "error",
                title: "Désolé!",
                text: msg,
              });
            } else {
              this.goBack();
            }
          },
          error: (e) => console.log('ERROR : ', e)
        })
      },
      error => console.log(error)
    )
  }

  getStatusLabel(value: string): string {
    if(this.referentials) {
      const found = this.referentials.mvtStatus.find((status: any) => status.valeur == value);
      return found.libelle;
    }
    return '';
  }

  getMotifSortieLabel(value: string): string {
    if(this.referentials) {
      const found = this.referentials.motifsSortie.find((status: any) => status.valeur == value);
      return found.libelle;
    }
    return '';
  }

}
