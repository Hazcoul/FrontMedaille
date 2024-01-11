
export interface ILigneSortieImpression {
    quantite?: number;
    medaille?: string;
}

export class LigneSortieImpression implements ILigneSortieImpression {
    constructor(
        public quantite?: number,
        public numeroSortie?: number,
        public dateSortie?: Date ,
        public medaille?: string,
    ) {

    }
}
