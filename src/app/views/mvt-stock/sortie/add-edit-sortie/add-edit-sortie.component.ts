import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { SortieService } from '../../../../services/sortie.service';
import { ILigneSortie } from 'src/app/entities/ligne-sortie.model';
import { Sortie, ISortie } from '../../../../entities/sortie.model';
import { AddEditLigneSortieComponent } from '../add-edit-ligne-sortie/add-edit-ligne-sortie.component';
import { ReferentialService } from '../../../../services/referential.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { IMagasin } from 'src/app/entities/magasin.model';
import { IOrdonnateur } from 'src/app/entities/ordonnateur.model';
import { IDetenteur } from 'src/app/entities/detenteur';
import { IBeneficiaire } from 'src/app/entities/beneficiaire.model';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { OrdonnateurService } from 'src/app/services/ordonnateur.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { IPieceJointe } from 'src/app/entities/piece-jointe.model';
import { AddEditPjComponent } from '../../add-edit-pj/add-edit-pj.component';

@Component({
  selector: 'app-add-edit-sortie',
  templateUrl: './add-edit-sortie.component.html',
  styleUrl: './add-edit-sortie.component.scss'
})
export class AddEditSortieComponent implements OnInit {

  isSaving = false;
  sortie: ISortie = new Sortie();
  referentials?: any;
  magasins?: IMagasin[];
  ordonnateurs?: IOrdonnateur[];
  detenteurs?: IDetenteur[];
  beneficiaires?: IBeneficiaire[];
  ordonnateurId?: number | null;
  selectedDetenteurId?: number | null;
  selectedBeneficiaireId?: number | null;
  selectedMagasinId?: number | null;
  files?: File[];
  pieceJointes?: IPieceJointe[];

  constructor(
    private sortieService: SortieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private referentialService: ReferentialService,
    private magasinService: MagasinService,
    private beneficiaireService: BeneficiaireService,
    private detenteurService: DetenteurService,
    private ordonnateurService: OrdonnateurService
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

    /**
     * Get all magasin
     */
    this.magasinService.query().subscribe({
      next: (res: HttpResponse<IMagasin[]>) => {
        this.magasins = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })

    /**
     * Get all beneficiaire
     */
    this.beneficiaireService.query().subscribe({
      next: (res: HttpResponse<IBeneficiaire[]>) => {
        this.beneficiaires = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all detenteurs
     */
    this.detenteurService.query().subscribe({
      next: (res: HttpResponse<IDetenteur[]>) => {
        this.detenteurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all ordonnateurs
     */
    this.ordonnateurService.query().subscribe({
      next: (res: HttpResponse<IOrdonnateur[]>) => {
        this.ordonnateurs = res.body || [];
        console.log('ORDONNATEUR 1 :', this.ordonnateurs[1]);
      },
      error: (e) => console.log('ERROR : ', e)
    })

    const idSortie = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(idSortie) {
      this.sortieService.find(idSortie).subscribe({
        next: (res: HttpResponse<ISortie>) => {
          if(res.body) {
            this.sortie = res.body
            console.log('SORTIE : ', this.sortie);
            this.ordonnateurId = this.sortie.ordonnateur?.idOrdonnateur;
            this.selectedBeneficiaireId = this.sortie.beneficiaire?.idBeneficiaire;
            this.selectedDetenteurId = this.sortie.detenteur?.idDetenteur;
            this.selectedMagasinId = this.sortie.magasin?.idMagasin;
            this.sortie.dateSortie = moment(this.sortie.dateSortie).format('yyyy-MM-DD');
          }
        },
        error: (e) => console.log('ERROR : ', e)
      })
      this.getAllPjForSortie(idSortie);
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

  openAddEditModal(ligneSortie?: ILigneSortie): void {
    const modalRef = this.modalService.open(AddEditLigneSortieComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneSortie) {
      modalRef.componentInstance.ligneSortie = cloneDeep(ligneSortie);
      modalRef.componentInstance.selectedMedailleId = ligneSortie.medaille?.idMedaille;
    }
    modalRef.result.then((res) => {
      if(undefined == this.sortie.ligneSorties){
        this.sortie.ligneSorties = [];
      }
      const foundIdxLine = this.sortie.ligneSorties!.findIndex((line)=> line.medaille?.nomComplet == res.medaille?.nomComplet);
      if (-1 != foundIdxLine) {
        this.sortie.ligneSorties!.splice(foundIdxLine, 1);
      }
      console.log('MEDAILLE CHOOSED : ', res);
      this.sortie.ligneSorties!.push(res);
    },
    error => {
      console.log(error)
    })
  }

  confirmRemoveLine(ligneSortie: ILigneSortie): void {
    Swal.fire({
      title: "Etes-vous vraiment sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeLigne(ligneSortie);
      }
    });
  }

  showToast(msg: string) : void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: msg
    });
  }

  removeLigne(ligneSortie: ILigneSortie): boolean {
    let isRemoved = false;
    const foundIdxLine = this.sortie.ligneSorties!.findIndex((line)=> line.idLigneSortie == ligneSortie.idLigneSortie);
    if (-1 != foundIdxLine) {
      this.sortie.ligneSorties!.splice(foundIdxLine, 1);
      if(ligneSortie.idLigneSortie) {
        this.sortieService.deleteLine(this.sortie.idSortie!, ligneSortie.idLigneSortie!).subscribe({
          next: (res) => {
              this.showToast('Ligne supprmée avec succès.');
          },
          error: (e) =>{
            console.log('ERROR : ', e)
            if(e.error && 'msg' in e.error) {
              const msg = '' + e.error.msg;
              Swal.fire({
                icon: "error",
                title: "Désolé!",
                text: msg,
              });
            }
          }
         })
      } else {
        this.showToast('Ligne supprmée avec succès.');
      }
      isRemoved = true
    }
    return isRemoved;
  }

  
  openAddEditPjModal(pj?: IPieceJointe): void {
    const modalRef = this.modalService.open(AddEditPjComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != pj) {
      modalRef.componentInstance.pieceJointe = cloneDeep(pj);
    }
    modalRef.componentInstance.typeMvt = 'S';
    modalRef.result.then((res) => {
      if(undefined == this.pieceJointes){
        this.pieceJointes = [];
        this.files = [];
      }
      const foundIdxPj = this.pieceJointes!.findIndex((pj)=> pj.referencePiece == res.pieceJointe.referencePiece || pj.typePiece == res.pieceJointe.typePiece);
      if (-1 != foundIdxPj) {
        this.pieceJointes!.splice(foundIdxPj, 1);
        this.files!.splice(foundIdxPj, 1);
      }
      this.pieceJointes!.push(res.pieceJointe);
      this.files!.push(res.file);
    },
    error => {
      console.log(error)
    })
  }

  removePj(pj: IPieceJointe): boolean {
    let isRemoved = false;
    const foundIdxPj = this.pieceJointes!.findIndex((elem)=> elem.idPiece == pj.idPiece);
    if (-1 != foundIdxPj) {
      this.pieceJointes!.splice(foundIdxPj, 1);
      isRemoved = true
    }
    return isRemoved;
  }

  goBack(): void {
    this.router.navigate(['/mouvement/sortie']);
  }

  save(): void {
    this.isSaving = true;
    this.sortie.ordonnateur = this.ordonnateurs?.find((elem) => elem.idOrdonnateur === this.ordonnateurId);
    this.sortie.beneficiaire = this.beneficiaires?.find((elem) => elem.idBeneficiaire === this.selectedBeneficiaireId);
    this.sortie.magasin = this.magasins?.find((elem) => elem.idMagasin === this.selectedMagasinId);
    if(this.selectedDetenteurId) {
      this.sortie.detenteur = this.detenteurs?.find((elem) => elem.idDetenteur === this.selectedDetenteurId);
    }
    if (this.sortie?.idSortie !== undefined) {
      this.subscribeToSaveResponse(this.sortieService.update(this.sortie, this.pieceJointes!, this.files!));
    } else {
      this.subscribeToSaveResponse(this.sortieService.create(this.sortie!, this.pieceJointes!, this.files!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISortie>>): void {
    result.subscribe({
      next: (res) => {
        console.log("NEXT : ", res);
        this.onSaveSuccess();
      },
      error: (e) => this.onSaveError(e)
    });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.goBack();
  }

  protected onSaveError(e: any): void {
    this.isSaving = false;
    if(e.error) {
      Swal.fire({
        icon: "error",
        title: "Désolé!",
        text: e.error.msg,
      });
    }
  }

  trackById(index: number, item: ISortie): any {
    return item.idSortie;
  }


}
