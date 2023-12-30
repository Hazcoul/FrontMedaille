import { IDistinction } from "./distinction.model";
import {Grade, IGrade} from "./grade.model";
import { Moment } from 'moment';

export interface IMedaille {
    idMedaille?: number | null;
    nomComplet?: string | null;
    stock?: number | null;
    lienImage?: string | null;
    description?: string | null;
    horsUsage?: boolean | null;
    distinction?: IDistinction;
    grade?: Grade;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    image?:string
}

export class Medaille implements IMedaille {
    constructor(
        public idMedaille?: number | null,
        public nomComplet?: string | null,
        public stock?: number | null,
        public lienImage?: string | null,
        public description?: string | null,
        public horsUsage?: boolean | null,
        public distinction?: IDistinction,
        public grade?: Grade,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public image?:string
    ) {
        this.horsUsage = horsUsage;
    }
}
