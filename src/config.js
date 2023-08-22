const app = {
  PORT: process.env.PORT || 3002,
  NODE_ENV: "test", // # development | production | testing
};

const cors = {
  origin: process.env.CLIENT_URL,
  methods: ["OPTIONS", "GET", "POST", "PUT"],
  credentials: false,
};

const websocket = {
  transports: ["websocket"],
  cors,
};

const mariadbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  connectionLimit: 20,
  acquireTimeout: 10000,
};

export default {
  app,
  cors,
  websocket,
  mariadbConfig
};
