import {
  register,
  lgoIn,
  LogInRequired,
  getUserData
} from "../Controllers/userController";

const userRoutes = app => {
  app.route("/register").post(register);

  app.route("/login").post(lgoIn);
  app.route("/register/:email").get(getUserData);
};

export default userRoutes;
