import { login } from "./login.js";
import { logup } from "./logup.js";
import { resolver } from "../middlewares/errorAsync.js"

const routes = (app) => {
  app.use(`/login`, resolver(login));
  app.use(`/logup`, resolver(logup));
}

export default routes;
