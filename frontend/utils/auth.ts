import cookie from "js-cookie";

const saveToken = (token: string) => {
  if (token) {
    cookie.set("front.token", token, { expires: 1 });
  }
};

const removeToken = (): void => {
  cookie.remove("front.token");
};

const getToken = () => {
  return cookie.get("front.token");
};

const getAuthorization = () => {
  return cookie.get("front.token")
    ? `Bearer ${cookie.get("front.token")}`
    : false;
};

export { saveToken, getAuthorization, removeToken, getToken };
