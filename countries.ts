import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.
import {app} from "./app"

app.post("/countries", async (req, res) => {
    try {
      const { countryName, waterQuality, waterComsumption } = req.body
      
      let userScore = 0;
  
      const newCountry = await prisma.country.create({
        data: {
          countryName,
          waterQuality,
          waterComsumption,
          userScore
        },
      })
  
      res.json(newCountry)
    } catch (error: any) {
      console.log(error.message)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
})

app.get("/countries", async (req, res) => {
    try {
      const countries = await prisma.country.findMany()
  
      res.json(countries)
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})

app.delete("/countries/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCountry = await prisma.country.delete({
        where: {
          id : parseInt(id),
        },
      })
  
      res.json(deletedCountry)
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
