import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { EntreeService } from '../../../../services/entree.service';
import { ILigneEntree } from 'src/app/entities/ligne-entree.model';
import { Entree, IEntree } from '../../../../entities/entree.model';
import { AddEditLigneEntreeComponent } from '../add-edit-ligne-entree/add-edit-ligne-entree.component';
import { ReferentialService } from '../../../../services/referential.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { IFournisseur } from 'src/app/entities/fournisseur.model';
import { IMagasin } from 'src/app/entities/magasin.model';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { IPieceJointe } from '../../../../entities/piece-jointe.model';
import { AddEditPjComponent } from '../../add-edit-pj/add-edit-pj.component';

@Component({
  selector: 'app-add-edit-entree',
  templateUrl: './add-edit-entree.component.html',
  styleUrl: './add-edit-entree.component.scss'
})
export class AddEditEntreeComponent implements OnInit {

  isSaving = false;
  entree: IEntree = new Entree();
  referentials?: any;
  fournisseurs?: IFournisseur[];
  magasins?: IMagasin[];
  selectedFournisseurId?: number | null;
  selectedMagasinId?: number | null;
  files?: File[];
  pieceJointes?: IPieceJointe[];

  constructor(
    private entreeService: EntreeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private referentialService: ReferentialService,
    private fournisseurService: FournisseurService,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {

    const idEntree = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(idEntree) {
      this.entreeService.find(idEntree).subscribe({
        next: (res: HttpResponse<IEntree>) => {
          if(res.body) {
            this.entree = res.body
            this.selectedFournisseurId = this.entree.fournisseur?.idFournisseur;
            this.selectedMagasinId = this.entree.magasin?.idMagasin;
            this.entree.dateEntree = moment(this.entree.dateEntree).format('yyyy-MM-DD');
            this.entree.dateReception = moment(this.entree.dateReception).format('yyyy-MM-DD');
            console.log('ENTREE : ', this.entree);
          }
        },
        error: (e) => console.log('ERROR : ', e)
      })
      this.getAllPjForEntree(idEntree);
    }

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
     * Get all fournisseurs
     */
    this.fournisseurService.query().subscribe({
      next: (res: HttpResponse<IFournisseur[]>) => {
        this.fournisseurs = res.body || [];
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

  openAddEditModal(ligneEntree?: ILigneEntree): void {
    const modalRef = this.modalService.open(AddEditLigneEntreeComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneEntree) {
      modalRef.componentInstance.ligneEntree = cloneDeep(ligneEntree);
      modalRef.componentInstance.selectedMedailleId = ligneEntree.medaille?.idMedaille;
    }
    modalRef.result.then((res) => {
      if(undefined == this.entree.ligneEntrees){
        this.entree.ligneEntrees = [];
      }
      const foundIdxLine = this.entree.ligneEntrees!.findIndex((line)=> line.medaille?.nomComplet == res.medaille?.nomComplet);
      if (-1 != foundIdxLine) {
        this.entree.ligneEntrees!.splice(foundIdxLine, 1);
      }
      this.entree.ligneEntrees!.push(res);
    },
    error => {
      console.log(error)
    })
  }

  confirmRemoveLine(ligneEntree: ILigneEntree): void {
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
        this.removeLigne(ligneEntree);
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

  removeLigne(ligneEntree: ILigneEntree): boolean {
    let isRemoved = false;
    const foundIdxLine = this.entree.ligneEntrees!.findIndex((line)=> line.idLigneEntree == ligneEntree.idLigneEntree);
    if (-1 != foundIdxLine) {
      this.entree.ligneEntrees!.splice(foundIdxLine, 1);
      if(ligneEntree.idLigneEntree) {
        this.entreeService.deleteLine(this.entree.idEntree!, ligneEntree.idLigneEntree!).subscribe({
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
        this.showToast('Ligne supprimée avec succès.');
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
    modalRef.componentInstance.typeMvt = 'E';
    modalRef.result.then((res) => {
      if(undefined == this.pieceJointes){
        this.pieceJointes = [];
      }
      if(undefined == this.files) {
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
    this.router.navigate(['/mouvement/entree']);
  }

  save(): void {
    this.entree.fournisseur = this.fournisseurs?.find((elem) => elem.idFournisseur === this.selectedFournisseurId);
    this.entree.magasin = this.magasins?.find((elem) => elem.idMagasin === this.selectedMagasinId);
    this.isSaving = true;
    if (this.entree?.idEntree !== undefined) {
      console.log('UPDATING_ENTREE : ', this.entree);
      console.log('UPDATING_PJ : ', this.pieceJointes);
      this.subscribeToSaveResponse(this.entreeService.update(this.entree, this.pieceJointes!, this.files!));
    } else {
      this.subscribeToSaveResponse(this.entreeService.create(this.entree!, this.pieceJointes!, this.files!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntree>>): void {
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

  trackById(index: number, item: IEntree): any {
    return item.idEntree;
  }

}
