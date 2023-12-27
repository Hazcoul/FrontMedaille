import { IMedaille } from "./medaille.model";
import { ISortie } from "./sortie.model";
import { Moment } from 'moment';

export interface ILigneSortie {
    idLigneSortie?: number | null;
    quantiteLigne?: number | null;
    isCloseSortie?: boolean | null;
    sortie?: ISortie;
    medaille?: IMedaille;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class LigneSortie implements ILigneSortie {
    constructor(
        public idLigneSortie?: number | null,
        public quantiteLigne?: number | null,
        public isCloseSortie?: boolean | null,
        public sortie?: ISortie,
        public medaille?: IMedaille,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {
        this.isCloseSortie = false;
    }
}