import { IEntree } from "./entree.model";
import { IMedaille } from "./medaille.model";

export interface ILigneEntree {
    idLigneEntree?: number | null;
    quantiteLigne?: number | null;
    prixUnitaire?: number | null;
    montantLigne?: number | null;
    isCloseEntree?: boolean | null;
    entree?: IEntree;
    medaille?: IMedaille;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class LigneEntree implements ILigneEntree {
    constructor(
        public idLigneEntree?: number | null,
        public quantiteLigne?: number | null,
        public prixUnitaire?: number | null,
        public montantLigne?: number | null,
        public isCloseEntree?: boolean | null,
        public entree?: IEntree,
        public medaille?: IMedaille,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {
        this.isCloseEntree = false;
    }
}