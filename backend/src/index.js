import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import routes from "./routes/_routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(routes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect("mongodb://localhost/projeto")
  .then(() => console.info("Connected to Database"))
  .catch((err) => console.error(`Error ${err}`));

app.listen(PORT, () => {
  console.info(`app rodando em http://localhost:${PORT}`);
});
