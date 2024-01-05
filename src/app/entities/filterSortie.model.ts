
export interface IFilterSortie {
  ordonnateur?: number;
  detenteur?: number;
  beneficiaire?: number;
  annee?: number;
  motifSortie?: string;
}

export class FilterSortie implements IFilterSortie {
    constructor(
      public ordonnateur?: number,
      public detenteur?: number,
      public beneficiaire?: number,
      public annee?: number,
      public motifSortie?: string,

    ) {}
}
