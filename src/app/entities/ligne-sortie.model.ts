import { IMedaille } from "./medaille.model";
import { ISortie } from "./sortie.model";

export interface ILigneSortie {
    idLigneSortie: number | null;
    quantiteLigne?: number | null;
    isCloseSortie?: boolean | null;
    sortie?: ISortie;
    medaille?: IMedaille;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class LigneSortie implements ILigneSortie {
    constructor(
        public idLigneSortie: number | null,
        public quantiteLigne?: number | null,
        public isCloseSortie?: boolean | null,
        public sortie?: ISortie,
        public medaille?: IMedaille,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {
        this.isCloseSortie = false;
    }
}