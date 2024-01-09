
export interface IAuthentification {
  login?: string;
  password?: string;
  rememberMe?: boolean;
}

export class Authentification implements IAuthentification {
    constructor(
      public login?: string,
      public password?: string,
      public rememberMe?: boolean,

    ) {}
}
