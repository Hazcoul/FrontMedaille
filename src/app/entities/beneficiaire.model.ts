import { Moment } from 'moment';

export interface IBeneficiaire {
    idBeneficiaire: number | null;
    sigle?: string | null;
    raisonSociale?: string | null;
    telephoneFix?: string | null;
    telephoneMobile?: string | null;
    email?: string | null;
    adresse?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Beneficiaire implements IBeneficiaire {
    constructor(
        public idBeneficiaire: number | null,
        public sigle?: string | null,
        public raisonSociale?: string | null,
        public telephoneFix?: string | null,
        public telephoneMobile?: string | null,
        public email?: string | null,
        public adresse?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}