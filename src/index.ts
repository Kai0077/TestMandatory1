import express from "express";
import { db } from "./db/index.js";

const app = express();
app.get("/", async (_req, res) => {
  const ddd = await db.query.townTable.findMany();
  res.send();
});
const PORT = 8080;

app.listen(PORT);
