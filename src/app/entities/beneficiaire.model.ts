export interface IBeneficiaire {
    idBeneficiaire: number | null;
    sigle?: string | null;
    raisonSociale?: string | null;
    telephoneFix?: string | null;
    telephoneMobile?: string | null;
    email?: string | null;
    adresse?: string | null;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
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
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {}
}