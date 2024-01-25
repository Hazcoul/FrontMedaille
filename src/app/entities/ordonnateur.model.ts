import { Moment } from 'moment';

export interface IOrdonnateur {
    idOrdonnateur?: number | null;
    matricule?: string | null;
    nom?: string | null;
    prenom?: string | null;
    civilite?: string | null
    fonction?: string | null;
    telephone?: string | null;
    email?: string | null;
    gradeMilitaire?: string | null;
    titreHonorifique?: string | null;
    actuel?: boolean | null;
    debutMandat?: Date | string | null;
    finMandat?: Date | string | null;
    gradeMilitaire? : string;
    titreHonorifique? : string;
    actuel? : boolean;
    debutMandat? : Date | string;
    finMandat? : Date | string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Ordonnateur implements IOrdonnateur {
    constructor(
        public idOrdonnateur?: number | null,
        public matricule?: string | null,
        public nom?: string | null,
        public prenom?: string | null,
        public civilite?: string | null,
        public fonction?: string | null,
        public telephone?: string | null,
        public email?: string | null,
        public gradeMilitaire?: string | null,
        public titreHonorifique?: string | null,
        public actuel?: boolean | null,
        public debutMandat?: Date | string | null,
        public finMandat?: Date | string | null,
        public gradeMilitaire? : string,
        public titreHonorifique? : string,
        public actuel? : boolean,
        public debutMandat? : Date,
        public finMandat? : Date,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}