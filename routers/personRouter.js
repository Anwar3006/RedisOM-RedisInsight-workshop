import { Router } from "express";
import { personRepository } from "../om/person.model.js";

export const router = Router();

// CREATE
router.post("/", async (req, res) => {
  const new_person = await personRepository.createAndSave(req.body);
  res.send(new_person);
});

// READ
router.get("/:id", async (req, res) => {
  const getPerson = await personRepository.fetch(req.params.id);
  res.send(getPerson);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const getPerson = await personRepository.fetch(req.params.id);
  if (getPerson) {
    getPerson.firstName = req.body.firstName ?? null;
    getPerson.lastName = req.body.lastName ?? null;
    getPerson.age = req.body.age ?? null;
    getPerson.verified = req.body.verified ?? null;
    getPerson.location = req.body.location ?? null;
    getPerson.locationUpdated = req.body.locationUpdated ?? null;
    getPerson.skills = req.body.skills ?? null;
    getPerson.personalStatementon = req.body.personalStatement ?? null;

    await personRepository.save(getPerson);
    res.send(getPerson);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const getPerson = await personRepository.remove(req.params.id);
  res.send({ id: req.params.id });
});
