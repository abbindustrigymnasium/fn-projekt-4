import express from "express";
import prisma from "./prisma";
import { app } from "./app";

app.post("/users", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    res.json(newUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    }); 
  }
});

  



