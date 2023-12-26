import { IEntree } from "./entree.model";
import { IMedaille } from "./medaille.model";
import { Moment } from 'moment';

export interface ILigneEntree {
    idLigneEntree: number | null;
    quantiteLigne?: number | null;
    prixUnitaire?: number | null;
    montantLigne?: number | null;
    isCloseEntree?: boolean | null;
    entree?: IEntree;
    medaille?: IMedaille;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class LigneEntree implements ILigneEntree {
    constructor(
        public idLigneEntree: number | null,
        public quantiteLigne?: number | null,
        public prixUnitaire?: number | null,
        public montantLigne?: number | null,
        public isCloseEntree?: boolean | null,
        public entree?: IEntree,
        public medaille?: IMedaille,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {
        this.isCloseEntree = false;
    }
}