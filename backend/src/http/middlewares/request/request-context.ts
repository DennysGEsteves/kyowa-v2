import { UserEntity } from '../../../entities/user';

export interface IRequestContextProps {
  user: UserEntity;
}

export class RequestContext {
  public readonly user: UserEntity;

  constructor(props: IRequestContextProps) {
    this.user = props.user;
  }
}
