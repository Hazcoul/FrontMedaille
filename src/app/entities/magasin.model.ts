import { IDepot } from "./depot.model";

export interface IMagasin {
    idMagasin: number | null;
    nomMagasin?: string | null;
    capacite?: number | null;
    description?: string | null;
    depot?: IDepot;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Magasin implements IMagasin {
    constructor(
        public idMagasin: number | null,
        public nomMagasin?: string | null,
        public capacite?: number | null,
        public description?: string | null,
        public depot?: IDepot,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {}
}