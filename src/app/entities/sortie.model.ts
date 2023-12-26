import { IBeneficiaire } from "./beneficiaire.model";
import { IDetenteur } from "./detenteur";
import { ILigneSortie } from "./ligne-sortie.model";
import { IMagasin } from "./magasin.model";
import { IOrdonnateur } from "./ordonnateur.model";
import { Moment } from 'moment';

export interface ISortie {
    idSortie: number | null;
    dateSortie?: Date;
    motifSortie?: string | null;
    validerLe?: Date;
    validerPar?: string | null;
    description?: string | null;
    ordonnateur?: IOrdonnateur;
    beneficiaire?: IBeneficiaire;
    detenteur?: IDetenteur;
    magasin?: IMagasin;
    ligneSorties?: ILigneSortie[];
    status?: string | null;
    numeroSortie?: string | null
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Sortie implements ISortie {
    constructor(
        public idSortie: number | null,
        public dateSortie?: Date,
        public motifSortie?: string | null,
        public validerLe?: Date,
        public validerPar?: string | null,
        public description?: string | null,
        public ordonnateur?: IOrdonnateur,
        public beneficiaire?: IBeneficiaire,
        public detenteur?: IDetenteur,
        public magasin?: IMagasin,
        public ligneSorties?: ILigneSortie[],
        public status?: string | null,
        public numeroSortie?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}