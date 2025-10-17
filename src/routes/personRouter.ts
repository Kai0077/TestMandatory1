import express from "express";

const router = express.Router();

router.get("/cpr", (req, res) => {
  res.send({ message: "" })
});

router.get("/name-surname-gender", (req, res) => {
  res.send({ message: ""})
});

router.get("/name-surname-gender-birth", (req, res) => {
  res.send({ message: ""})
});

router.get("/address", (req, res) => {
  res.send({ message: "" })
});

router.get("/phone", (req, res) => {
  res.send({ message: "" })
});

router.get("/person", (req, res) => {
  res.send({ message: "" })
});

router.get("/persons", (req, res) => {
  res.send({ message: "" })
});

export default router;