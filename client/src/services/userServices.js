import http from "./httpServices";
// import { apiUrl } from "../config.json";

const url = "/register";

function getRegisterUrl(field) {
  return `${url}/${field}`;
}

export function register(user) {
  return http.post(url, {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  });
}

export function read_Users(value) {
  return http.get(getRegisterUrl(value));
}

export default {
  register,
  read_Users
};
