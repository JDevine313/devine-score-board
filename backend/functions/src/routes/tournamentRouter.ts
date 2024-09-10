import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import { Tournament } from "../models/Tournament";

const tournamentRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
tournamentRouter.get("/tournaments", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Tournament[]>("tournaments")
      .findOne({});
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});
tournamentRouter.get("/tournaments/all", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Tournament[]>("tournaments").find();
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});

tournamentRouter.get("/tournaments/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Tournament>("tournaments")
      .findOne({ _id: new ObjectId(id) });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "ID not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

tournamentRouter.post("/tournaments", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
    await client.db().collection<Tournament>("tournaments").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

tournamentRouter.put("/tournaments/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Tournament>("tournaments")
      .replaceOne({ _id: new ObjectId(id) }, replacement);
    if (result.modifiedCount) {
      res.status(200);
      res.json(replacement);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

tournamentRouter.patch("/tournaments/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Tournament>("tournaments")
      .updateOne({ _id: new ObjectId(id) }, { $push: { players: update } });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
tournamentRouter.patch(
  "/tournaments/:id/winner/:gameIndex",
  async (req, res) => {
    try {
      let id: string = req.params.id as string;
      let gameIndex: string = req.params.gameIndex as string;
      const winner = req.body.winner;
      let x: any = `games.${gameIndex}.winner`;
      const client = await getClient();
      const result = await client
        .db()
        .collection<Tournament>("tournaments")
        .updateOne({ _id: new ObjectId(id) }, { $set: { [x]: winner } });
      if (result.modifiedCount) {
        res.status(200);
        res.json(winner);
      } else {
        res.status(404);
        res.send("ID not found");
      }
    } catch (error) {
      errorResponse(error, res);
    }
  }
);
tournamentRouter.patch("/tournaments/:id/game", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Tournament>("tournaments")
      .updateOne({ _id: new ObjectId(id) }, { $push: { games: update } });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
tournamentRouter.patch(
  "/tournaments/:id/points/:gameId/:scoreIndex/:gameIndex",
  async (req, res) => {
    try {
      let id: string = req.params.id as string;
      let gameId: string = req.params.gameId as string;
      let scoreIndex: string = req.params.scoreIndex as string;
      let gameIndex: string = req.params.gameIndex as string;
      const update = req.body; //{points: 3}
      let x: any = {};
      x[`games.${gameIndex}.score.${scoreIndex}`] = parseInt(update.points);
      const client = await getClient();
      const result = await client
        .db()
        .collection<Tournament>("tournaments")
        .updateOne(
          {
            _id: new ObjectId(id),
            "games._id": gameId,
          },
          { $inc: x }
        );
      if (result.modifiedCount) {
        res.status(200);
        res.json(update);
      } else {
        res.status(404);
        res.send("ID not found");
      }
    } catch (error) {
      errorResponse(error, res);
    }
  }
);
tournamentRouter.patch(
  "/tournaments/:id/points/:gameId/:scoreIndex/:gameIndex/bust",
  async (req, res) => {
    try {
      let id: string = req.params.id as string;
      let gameId: string = req.params.gameId as string;
      let scoreIndex: string = req.params.scoreIndex as string;
      let gameIndex: string = req.params.gameIndex as string;
      const update = req.body; //{points: 3}
      let x: any = {};
      x[`games.${gameIndex}.score.${scoreIndex}`] = parseInt(update.points);
      const client = await getClient();
      const result = await client
        .db()
        .collection<Tournament>("tournaments")
        .updateOne(
          {
            _id: new ObjectId(id),
            "games._id": gameId,
          },
          { $set: x }
        );
      if (result.modifiedCount) {
        res.status(200);
        res.json(update);
      } else {
        res.status(404);
        res.send("ID not found");
      }
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

tournamentRouter.delete("/tournaments/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Tournament>("tournaments")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("No ID found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default tournamentRouter;
