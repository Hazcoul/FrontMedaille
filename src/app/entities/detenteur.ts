import { Moment } from 'moment';

export interface IDetenteur {
    idDetenteur?: number | null;
    matricule?: string | null;
    civilite?: string | null;
    nom?: string | null;
    prenom?: string | null;
    fonction?: string | null;
    telephone?: string | null;
    email?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Detenteur implements IDetenteur {
    constructor(
        public idDetenteur?: number | null,
        public matricule?: string | null,
        public civilite?: string | null,
        public nom?: string | null,
        public prenom?: string | null,
        public fonction?: string | null,
        public telephone?: string | null,
        public email?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}