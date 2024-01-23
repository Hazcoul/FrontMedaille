
export interface IResetPassword {
  newPassword?: string;
  oldPassword?: string;
}

export class ResetPassword implements IResetPassword {
    constructor(
      public newPassword?: string,
      public oldPassword?: string,
    ) {}
}
