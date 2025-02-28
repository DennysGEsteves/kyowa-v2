import { SigninDTOPresenter } from './dtos/signin.dto';

export class AuthPresenter {
  static toSignInDTO(access_token: string): SigninDTOPresenter {
    return {
      access_token,
    };
  }
}
