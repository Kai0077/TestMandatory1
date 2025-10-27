import express from "express";
import personRouter from "./personRouter.js";

const router = express.Router();

router.use(express.json());

router.get("/config", (req, res) => {
  res.status(200).json({ baseUrl: process.env.BASE_URL || "" });
});

router.use("/person", personRouter);

export default router;
