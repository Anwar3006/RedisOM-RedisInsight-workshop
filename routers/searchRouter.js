import { Router } from "express";
import { personRepository } from "../om/person.model.js";

export const router = Router();

// get all
router.get("/all", async (req, res) => {
  const getPersons = await personRepository.search().return.all();
  res.send(getPersons);
});

// filter by lastname
router.get("/by-last-name/:lastName", async (req, res) => {
  const lastName = req.params.lastName;
  const getPersons = await personRepository
    .search()
    .where("lastName")
    .equal(lastName)
    .return.all();
  res.send(getPersons);
});

// filter by age
router.get("/old-enough-to-drink-in-america", async (req, res) => {
  const getPersons = await personRepository
    .search()
    .where("age")
    .gte(21)
    .return.all();

  res.send(getPersons);
});

// filter by non-verified persons
router.get("/non-verified", async (req, res) => {
  const getPersons = await personRepository
    .search()
    .where("verified")
    .equal("false")
    .return.all();

  res.send(getPersons);
});

// Gets persons that are verified, 21+, and have a matching last name
router.get("/verified-drinkers-with-last-name/:lastName", async (req, res) => {
  const lastName = req.params.lastName;
  const getPersons = await personRepository
    .search()
    .where("lastName")
    .equal(lastName)
    .and("age")
    .gte(21)
    .and("verified")
    .is.not.true()
    .return.all();

  res.send(getPersons);
});

// Gets persons with personal statement matching the offered text
router.get("/with-statement-containing/:text", async (req, res) => {
  const text = req.params.text;
  const getPersons = await personRepository
    .search()
    .where("personalStatement")
    .matches(text)
    .return.all();
  res.send(getPersons);
});
