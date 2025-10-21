import express from "express";
import personRouter from "./personRouter.js";

const router = express.Router();

router.use(express.json());

router.use("/person", personRouter);

export default router;