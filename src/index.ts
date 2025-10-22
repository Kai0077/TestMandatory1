import express from "express";
import apiRouter from "./routes/api/index.js";

const app = express();

app.use("/api", apiRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
