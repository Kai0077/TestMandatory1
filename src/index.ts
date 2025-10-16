import express from "express";
import personRouter from "./routes/personRouter.js";
import fs from "fs";

const app = express();

app.use(express.json());

app.use("/api/person", personRouter);

const PORT = 8080;

const file = fs.readFileSync("persons.json").toString();
const personNames = JSON.parse(file);

console.log("File:");
console.log(personNames);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});