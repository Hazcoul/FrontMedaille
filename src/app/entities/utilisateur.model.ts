export interface IUtilisateur {
  id?: number;
  matricule?: string;
  nom?: string;
  prenom?: string;
  contact?: string;
  login?: string;
  email?: string;
}

export class Utilisateur implements IUtilisateur {
    constructor(
      public id?: number,
      public matricule?: string,
      public nom?: string,
      public prenom?: string,
      public contact?: string,
      public login?: string,
      public email?: string,
    ) {}
}
