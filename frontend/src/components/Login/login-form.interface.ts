export interface LoginFormReturnInterface {
  username: string;
  password: string;
}

export interface ILoginInterface {
  onSignIn: (values: LoginFormReturnInterface) => Promise<void>;
  onSignOn: () => void;
}
