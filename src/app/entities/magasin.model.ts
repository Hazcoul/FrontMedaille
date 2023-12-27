import { IDepot } from "./depot.model";
import { Moment } from 'moment';

export interface IMagasin {
    idMagasin?: number | null;
    nomMagasin?: string | null;
    capacite?: number | null;
    description?: string | null;
    depot?: IDepot;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Magasin implements IMagasin {
    constructor(
        public idMagasin?: number | null,
        public nomMagasin?: string | null,
        public capacite?: number | null,
        public description?: string | null,
        public depot?: IDepot,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}