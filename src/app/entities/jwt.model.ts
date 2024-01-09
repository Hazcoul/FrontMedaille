
export interface IJwt {
  accessToken?: string;
  tokenType?: string;
}

export class Jwt implements IJwt {
    constructor(
      public accessToken?: string,
      public tokenType?: string,

    ) {}
}
