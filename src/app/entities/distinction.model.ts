import { Moment} from 'moment';

export interface IDistinction {
    idDistinction: number | null;
    code?: string | null;
    abreviation?: string | null;
    libelle?: string | null;
    categoryDistinction?: string | null;
    referenceDecret?: string | null;
    dateDecretCreation?: Date;
    description?: string | null;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
}

export class Distinction implements IDistinction {
    constructor(
        public idDistinction: number | null,
        public code?: string | null,
        public abreviation?: string | null,
        public libelle?: string | null,
        public categoryDistinction?: string | null,
        public referenceDecret?: string | null,
        public dateDecretCreation?: Date,
        public description?: string | null,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
    ) {}
}