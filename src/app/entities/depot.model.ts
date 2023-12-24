export interface IDepot {
    idDepot: number | null;
    nomDepot?: string | null;
    description?: string | null;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Depot implements IDepot {
    constructor(
        public idDepot: number | null,
        public nomDepot?: string | null,
        public description?: string | null,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {}
}