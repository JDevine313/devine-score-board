import express from "express";
import { ObjectId } from "mongodb";
import Game from "../models/Game";
import { getClient } from "../db";

const gamesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
gamesRouter.get("/games", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Game[]>("games").find();
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});

gamesRouter.get("/games/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Game>("games")
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

gamesRouter.post("/games", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
    await client.db().collection<Game>("games").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

gamesRouter.put("/games/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Game>("games")
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

gamesRouter.patch("/games/add-player/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Game>("games")
      .updateOne(
        { _id: new ObjectId(id) },
        { $push: { players: update, score: 0 } }
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
});

gamesRouter.patch("/games/change-points/:id/:index", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    let index: string = req.params.index as string;
    const update = req.body; //{points: 3}
    let x: any = {};
    x[`score.${index}`] = parseInt(update.points);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Game>("games")
      .updateOne({ _id: new ObjectId(id) }, { $inc: x });
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

gamesRouter.delete("/games/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Game>("games")
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

export default gamesRouter;
