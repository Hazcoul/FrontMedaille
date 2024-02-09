import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IEntree } from 'src/app/entities/entree.model';
import { EntreeService } from 'src/app/services/entree.service';
import { ReferentialService } from 'src/app/services/referential.service';
import { RejetEntreeComponent } from '../rejet-entree/rejet-entree.component';
import { ValiderEntreeComponent } from '../valider-entree/valider-entree.component';
import Swal from 'sweetalert2';
import { IPieceJointe } from 'src/app/entities/piece-jointe.model';

@Component({
  selector: 'app-entree-detail',
  templateUrl: './entree-detail.component.html',
  styleUrl: './entree-detail.component.scss'
})
export class EntreeDetailComponent implements OnInit {

  referentials: any;
  entree: IEntree | null = null;
  active = 1;
  pieceJointes?: IPieceJointe[];

  constructor(
    private entreeService: EntreeService,
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
    
    this.activatedRoute.data.subscribe(({entree}) =>{
      console.log('ENTRE RESOLVE : ', entree.body);
      this.entree = entree.body;
      this.entree!.dateEntree = moment(this.entree?.dateEntree).format('DD/MM/yyyy');
      this.entree!.dateReception = moment(this.entree?.dateReception).format('DD/MM/yyyy');
    })
    // const idEntree = +this.activatedRoute.snapshot.paramMap.get('id')!;
    // if(idEntree) {
    //   this.entreeService.find(idEntree).subscribe({
    //     next: (res: HttpResponse<IEntree>) => {
    //       if(res.body) {
    //         this.entree = res.body
    //         console.log('ENTREE : ', this.entree);
    //       }
    //     },
    //     error: (e) => console.log('ERROR : ', e)
    //   })
    // }
    if(this.entree && this.entree.idEntree) {
      this.getAllPjForEntree(this.entree.idEntree);
    }
  }

  /**
     * Get all pj for given entree
     */
  getAllPjForEntree(id: number) {
    this.referentialService.getAllPieceJointes(id, 'entree').subscribe({
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
    this.router.navigate(['/mouvement/entree']);
  }

  generateEtat(id: number, format: string) {
    this.entreeService.generateEtat(id, format).subscribe({
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
  
  valider(entree: IEntree): void {
    const modalRef = this.modalService.open(ValiderEntreeComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.numEntree = entree.numeroCmd;
    modalRef.result.then((format) => {
      this.entreeService.valider(entree.idEntree!).subscribe({
        next: (res) => {
          if(res.body && 'msg' in res.body) {
            const msg = '' + res.body.msg;
            Swal.fire({
              icon: "error",
              title: "Désolé!",
              text: msg,
            });
          } else {
            this.generateEtat(entree.idEntree!, format);
            this.goBack();
          }
        },
        error: (e) => console.log('ERROR : ', e)
      })
    },
      error => console.log(error)
    )
  }

  rejeter(entree: IEntree): void {
    const modalRef = this.modalService.open(RejetEntreeComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.numEntree = entree.numeroCmd;
    modalRef.result.then((comment) => {
        entree.observation = comment;
        console.log('REJET : ', entree)
        this.entreeService.rejeter(entree.idEntree!, comment).subscribe({
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

  getAcquisitionLabel(value: string): string {
    if(this.referentials) {
      const found = this.referentials.acquisitions.find((status: any) => status.valeur == value);
      return found.libelle;
    }
    return '';
  }
}
