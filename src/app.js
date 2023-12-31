import express from "express";
import cors from "cors";
import { errorHandlerJSON } from "./middlewares/errorHandlerJSON.js";
import config from "./config.js";
import routes from "./routes/index.js";
import { errorSync } from "./middlewares/errorSync.js"
const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use(errorHandlerJSON);
app.use(errorSync)
app.use("/", express.static("src/public"));

routes(app);

export { app };
