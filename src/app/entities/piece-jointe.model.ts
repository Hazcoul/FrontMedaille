import {Moment} from 'moment';
import { IEntree } from "./entree.model";
import { ISortie } from "./sortie.model";

export interface IPieceJointe {
    idPiece?: number | null;
    typePiece?: string | null;
    lienPiece?: string | null;
    referencePiece?: string | null;
    description?: string | null;
    entree?: IEntree;
    sortie?: ISortie;
    fileBase64Content?:string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class PieceJointe implements IPieceJointe {
    constructor(
        public idPiece?: number | null,
        public typePiece?: string | null,
        public lienPiece?: string | null,
        public referencePiece?: string | null,
        public description?: string | null,
        public entree?: IEntree,
        public sortie?: ISortie,
        public fileBase64Content?:string,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}
