import express from "express";
import prisma from "./prisma";
import { app } from "./app";

app.post("/votes", async (req, res) => {
  try {
    const { water_vote, userId } = req.body;
    
    const newVote = await prisma.vote.create({
      data: {
        userId: userId,
        water_vote: water_vote
      },
    });
    res.json(newVote);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/votes/user/:id", async (req, res) => {
  try {
    const id = req.params.id

    const votes = await prisma.vote.findMany({
      where: {
        userId: +id
      }
    });

    res.json(votes);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});



