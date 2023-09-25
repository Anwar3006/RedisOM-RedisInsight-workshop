# STEPS for setting up Redis with Redis OM

- npm i redis-om
- Inside DB folder:

  - create file: `client.js`:

    - here is where you setup the client:

    ```javascript
    import { Client } from "redis-om";

    const url = process.env.REDIS_URL;
    const client = await new Client().open(url);

    export default client;
    ```

    - we get the `REDIS_URL` from `.env`, obviously you'll have to install `dotenv` (import 'dotenv/config' inside server.js)
    - we use `imports and exports` because we have configured `type: module` inside `package.json`

  - create file: `person.models.js` you can decide to create it in this folder or in a `entities` folder:

    - here we set up a schema for the redis entity(person table):

    ```javascript
    import { Entity, Schema } from "redis-om";
    import client from "./client.js";

    class Person extends Entity {}

    const personSchema = new Schema(Person, {
      firstName: { type: "string" },
      lastName: { type: "string" },
      age: { type: "number" },
      verified: { type: "boolean" },
      location: { type: "point" },
      locationUpdate: { type: "date" },
      skills: { type: "string[]" },
      personalStatement: { type: "text" },
    });

    export const personRepository = client.fetchRepository(personSchema);

    await personRepository.createIndex();
    ```

    - later on we would want to create an index, the index is useful for RedisSearch, a feature that allows querying/searching the database.
    - at the end of file we create the index.

- Then we can simply use the `personRepository` to expose the methods required to communicate with the database. In this project we, inside `router` folder, we establish the API routes, example:

```javascript
import { Router } from "express";
import { personRepository } from "../om/person.model.js";

export const router = Router();

// CREATE
router.post("/", async (req, res) => {
  const new_person = await personRepository.createAndSave(req.body);
  res.send(new_person);
});
```
