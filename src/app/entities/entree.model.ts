import { IFournisseur } from "./fournisseur.model";
import { ILigneEntree } from "./ligne-entree.model";
import { IMagasin } from "./magasin.model";
import { Moment } from 'moment';

export interface IEntree {
    idEntree?: number | null;
    dateEntree?: Date;
    numeroCmd?: string | null;
    validerLe?: Date;
    validerPar?: string | null;
    observation?: string | null;
    dateReception?: Date;
    exerciceBudgetaire?: number | null;
    acquisition?: string | null;
    fournisseur?: IFournisseur;
    magasin?: IMagasin;
    ligneEntrees?: ILigneEntree[];
    status?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Entree implements IEntree {
    constructor(
        public idEntree?: number | null,
        public dateEntree?: Date,
        public numeroCmd?: string | null,
        public validerLe?: Date,
        public validerPar?: string | null,
        public observation?: string | null,
        public dateReception?: Date,
        public exerciceBudgetaire?: number | null,
        public acquisition?: string | null,
        public fournisseur?: IFournisseur,
        public magasin?: IMagasin,
        public ligneEntrees?: ILigneEntree[],
        public status?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}