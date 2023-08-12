import { login } from "./login.js";
import { logup } from "./logup.js";

const routes = (app) => {
  app.use(`/login`, login);
  app.use(`/logup`, logup);
}

export default routes;
