export interface IGrade {
    idGrade?: number | null;
    typeGrade?: string | null;
    libelle?: string | null;
    description?: string | null;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Grade implements IGrade {
    constructor(
        public idGrade?: number | null,
        public typeGrade?: string | null,
        public libelle?: string | null,
        public description?: string | null,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
    ) {}
}