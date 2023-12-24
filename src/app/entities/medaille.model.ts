import { IDistinction } from "./distinction.model";
import { IGrade } from "./grade.model";

export interface IMedaille {
    idMedaille: number | null;
    nomComplet?: string | null;
    stock?: number | null;
    lienImage?: string | null;
    description?: string | null;
    horsUsage?: boolean | null;
    distinction?: IDistinction;
    grade?: IGrade;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Medaille implements IMedaille {
    constructor(
        public idMedaille: number | null,
        public nomComplet?: string | null,
        public stock?: number | null,
        public lienImage?: string | null,
        public description?: string | null,
        public horsUsage?: boolean | null,
        public distinction?: IDistinction,
        public grade?: IGrade,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {
        this.horsUsage = horsUsage;
    }
}