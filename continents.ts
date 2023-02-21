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

app.put("/continents/:id", async (req, res) => {
    try {
      const { vote } = req.body
      const { id } = req.params

      let continent = await prisma.continent.findUnique({
        where: {
          id : parseInt(id),
        }
      })
      
      let newScore = continent?.userScore;
      if (typeof newScore === 'number') {
        if (vote === "yes") newScore = newScore + 1
        else newScore -= 1

        const updatedCountry = await prisma.continent.update({
          where: {
            id : parseInt(id),
          },
          data: {
            continentName : continent?.continentName,
            waterQuality : continent?.waterQuality,
            waterComsumption : continent?.waterComsumption,
            userScore : newScore,
          },
        })
        res.json(updatedCountry)
      }
  
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      })
    }
})

