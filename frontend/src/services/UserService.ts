import { AxiosResponse } from "axios";
import request from "../../utils/request";
import { IUserInterface } from "@/app/usuarios/user.interface";
import { List } from "@/interfaces/list.interface";

const listUsers = (
  params: List
): Promise<AxiosResponse<{ users: IUserInterface[]; total: number }>> => {
  return request({
    url: `/user`,
    method: "GET",
    private: true,
    params,
  });
};

const createUser = (
  body: IUserInterface
): Promise<AxiosResponse<IUserInterface>> => {
  return request({
    url: `/user`,
    method: "POST",
    data: body,
    private: true,
  });
};

const getMe = (): Promise<AxiosResponse<IUserInterface>> => {
  return request({
    url: `/user/me`,
    method: "GET",
    private: true,
  });
};

export { listUsers, createUser, getMe };
