import express from "express";
import apiRouter from "./routes/api/index.js";
import path from "path";

const app = express();

app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
