export interface IProfil {
  id?: number;
  code?: string;
  libelle?: string;
  description?: string;
}

export class Profil implements IProfil {
    constructor(
      public id?: number,
      public code?: string,
      public libelle?: string,
      public description?: string,
    ) {}
}
