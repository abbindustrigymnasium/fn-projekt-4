import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.
import {app} from "./app"

app.post("/continents", async (req, res) => {
    try {
      const { continentName, waterQuality, waterComsumption } = req.body
      
      let userScore = 0;
  
      const newContinent = await prisma.continent.create({
        data: {
          continentName,
          waterQuality,
          waterComsumption,
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

app.get("/continents", async (req, res) => {
    try {
      const continents = await prisma.continent.findMany()
  
      res.json(continents)
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})

app.delete("/continents/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedContinent = await prisma.continent.delete({
        where: {
          id : parseInt(id),
        },
      })
  
      res.json(deletedContinent)
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})
/*
app.put("/users/:id", async (req, res) => {
    try {
      const { name, games } = req.body
      const { id } = req.params
  
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          games: {
            connectOrCreate: games.map((game: string) => ({
              where: { name: game },
              create: { name: game },
            })),
          },
        },
      })
  
      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})
*/
