import express from "express";
import personRouter from "./routes/personRouter.js";

const app = express();

app.use(express.json());

app.use("/api/person", personRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
