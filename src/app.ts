import express from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import serverless from "serverless-http";
import audit from 'express-requests-logger'

export const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(audit())

app.use("/", routes);

app.get("/hello", (req, res) => {
  res.json("Hello World!");
});

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

export const handler = serverless(app);
