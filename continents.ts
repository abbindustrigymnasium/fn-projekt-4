import express from "express"
import prisma from "./prisma"
import {app} from "./app"

app.post("/", async (req, res) => {
    try {
      const { continentName, waterQuality, waterConsumption, userScore } = req.body
    
      const newContinent = await prisma.continent.create({
        data: {
            continentName, 
            waterQuality,
            waterConsumption,
            userScore
        }, 
      })
      res.json(newContinent)
    } catch (error: any) {
      console.log(error.message)
      res.status(500).json({
        message: "Internal Server Error",
      })    
    }
  })

app.get("/", async (req, res) => {
    try {
        const users = await prisma.continent.findMany()

        res.json(users)
        console.log(users)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

