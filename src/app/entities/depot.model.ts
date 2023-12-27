import { Moment } from 'moment';
export interface IDepot {
    idDepot?: number | null;
    nomDepot?: string | null;
    description?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Depot implements IDepot {
    constructor(
        public idDepot?: number | null,
        public nomDepot?: string | null,
        public description?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}