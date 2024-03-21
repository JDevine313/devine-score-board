import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import playerRouter from "./routes/playerRouter";
import gamesRouter from "./routes/gameRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", gamesRouter);
app.use("/", playerRouter);
export const api = functions.https.onRequest(app);
