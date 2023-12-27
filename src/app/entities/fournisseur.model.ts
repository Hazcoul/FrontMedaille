import {Moment} from 'moment';

export interface IFournisseur {
    idFournisseur?: number | null;
    sigle?: string | null;
    libelle?: string | null;
    telephoneFix?: string | null;
    telephoneMobile?: string | null;
    email?: string | null;
    adresse?: string | null;
    numeroIfu?: string | null;
    nomCompletPersonneRessource?: string | null;
    telephonePersonneRessource?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Fournisseur implements IFournisseur {
    constructor(
        public idFournisseur?: number | null,
        public sigle?: string | null,
        public libelle?: string | null,
        public telephoneFix?: string | null,
        public telephoneMobile?: string | null,
        public email?: string | null,
        public adresse?: string | null,
        public numeroIfu?: string | null,
        public nomCompletPersonneRessource?: string | null,
        public telephonePersonneRessource?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}