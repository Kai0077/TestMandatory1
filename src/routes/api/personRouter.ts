import express from "express";
import {createCpr} from "../../cprHandler.js";
import {createPeople, createPerson, type TGender} from "../../personHandler.js";
import {generateAddress} from "../../addressHandler.js";
import {generatePhoneNumber} from "../../phoneNumberHandler.js";

const router = express.Router();

router.get("/cpr", (req, res) => {
  const birthday = (req.query.birthday as string) || "2002-07-12";
  const gender = (req.query.gender as TGender) || (Math.random() < 0.5 ? "male" : "female");
  
  const result = createCpr(birthday, gender);
  
  res.status(result.type === "ok" ? 200 : 400)
      .json(result.type === "ok" ? { cpr: result.data } : { error: String(result.err) });
});

router.get("/name-surname-gender", async (req, res) => {
  const result = await createPerson();
  
  if (result.type === "err") {
    return res.status(500).json({ error: String(result.err) });
  }
  
  const person = result.data;
  res.status(200).json({
    name: person.name,
    surname: person.surname,
    gender: person.gender,
  })
});

router.get("/name-surname-gender-birth", async (req, res) => {
  const result = await createPerson();

  if (result.type === "err") {
    return res.status(500).json({ error: String(result.err) });
  }

  const person = result.data;
  return res.status(200).json({
    name: person.name,
    surname: person.surname,
    gender: person.gender,
    birthdate: person.birthdate,
  });
});

router.get("/address", async (req, res) => {
  try {
    const address = await generateAddress();

    res.status(200).json({
      street: address.getStreet(),
      number: address.getNumber(),
      floor: address.getFloor(),
      door: address.getDoor(),
      town: {
        postalCode: address.getTown().getPostalCode(),
        name: address.getTown().getName(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate address" });
  }
});

router.get("/phone", (req, res) => {
  try {
    const phoneNumber = generatePhoneNumber();
    
    res.status(200).json({
      phone: phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate phone number" });
  }
});

router.get("/person", async (req, res) => {
  try {
    const result = await createPerson();

    if (result.type === "err") {
      return res.status(500).json({ error: String(result.err) });
    }

    const person = result.data;

    res.status(200).json({
      name: person.name,
      surname: person.surname,
      gender: person.gender,
      birthdate: person.birthdate,
      cpr: person.cpr,
      phone: person.phone,
      address: {
        street: person.adress.getStreet(),
        number: person.adress.getNumber(),
        floor: person.adress.getFloor(),
        door: person.adress.getDoor(),
        town: {
          postalCode: person.adress.getTown().getPostalCode(),
          name: person.adress.getTown().getName(),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
});

router.get("/persons", async(req, res) => {
  try {
    const amount = Number(req.query.amount);
    
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Missing or invalid amount of people to create" });
    }
    
    const result = await createPeople(amount);
    if (result.type === "err") {
      return res.status(500).json({ error: String(result.err) });
    }

    const persons = result.data.map((person) => ({
      name: person.name,
      surname: person.surname,
      gender: person.gender,
      birthdate: person.birthdate,
      cpr: person.cpr,
      phoneNumber: person.phone,
      address: {
        street: person.adress.getStreet(),
        number: person.adress.getNumber(),
        floor: person.adress.getFloor(),
        door: person.adress.getDoor(),
        town: {
          postalCode: person.adress.getTown().getPostalCode(),
          name: person.adress.getTown().getName(),
        },
      },
    }));

    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate persons" });
  }
});

export default router;
