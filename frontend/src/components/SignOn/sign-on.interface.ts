import { LoginFormReturnInterface } from "../Login/login-form.interface";

export interface SignOnFormInterface extends LoginFormReturnInterface {
  phone: number;
}

export interface ISignOnInterface {
  onSignOn: (values: SignOnFormInterface) => void;
  onBack?: () => void;
}
