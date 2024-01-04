
export interface IFilterEntree {
  fournisseur?: number;
  annee?: number;
}

export class FilterEntree implements IFilterEntree {
    constructor(
      public fournisseur?: number,
      public annee?: number,

    ) {}
}
