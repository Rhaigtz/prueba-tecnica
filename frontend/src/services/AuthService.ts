import { AxiosResponse } from "axios";
import { LoginFormReturnInterface } from "@/components/Login/login-form.interface";
import request from "../../utils/request";

const signInLogin = (
  body: LoginFormReturnInterface
): Promise<AxiosResponse<string>> => {
  return request({
    url: `/user/signIn`,
    method: "POST",
    data: body,
  });
};

const signOnInLogin = (
  body: LoginFormReturnInterface
): Promise<AxiosResponse<string>> => {
  return request({
    url: `/user`,
    method: "POST",
    data: body,
  });
};

export { signInLogin, signOnInLogin };
