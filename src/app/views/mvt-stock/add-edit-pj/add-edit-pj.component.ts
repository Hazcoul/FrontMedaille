import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPieceJointe, PieceJointe } from 'src/app/entities/piece-jointe.model';
import { ReferentialService } from 'src/app/services/referential.service';

@Component({
  selector: 'app-add-edit-pj',
  templateUrl: './add-edit-pj.component.html',
  styleUrl: './add-edit-pj.component.scss'
})
export class AddEditPjComponent implements OnInit {

  pieceJointe: IPieceJointe = new PieceJointe();
  referentials?: any;
  result: any = {};
  typePieces?: any;
  file: File | null = null;
  typeMvt!: string;

  constructor(
    private activeModal: NgbActiveModal,
    private referentialService: ReferentialService
  ) {}

  ngOnInit(): void {
      /**
     * Get all referentials
     */
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
        this.typePieces = this.referentials.typePieces.filter((item: any) => item.typeMvt == this.typeMvt);
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  save(): void {
    this.result['pieceJointe'] = this.pieceJointe;
    this.result['file'] = this.file;
    this.activeModal.close(this.result);
  }

  close(): void {
    this.activeModal.dismiss();
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.pieceJointe.lienPiece = file.name;
      console.warn("file",file);
    }
  }
}
