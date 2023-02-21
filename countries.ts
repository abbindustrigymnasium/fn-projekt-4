import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.
import {app} from "./app"
import { get } from "http"

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

app.put("/countries/:id", async (req, res) => {
    try {
      const { vote } = req.body
      const { id } = req.params

      let country = await prisma.country.findUnique({
        where: {
          id : parseInt(id),
        }
      })
      
      let newScore = country?.userScore;
      if (typeof newScore === 'number') {
        if (vote === "yes") newScore = newScore + 1
        else newScore -= 1

        const updatedCountry = await prisma.country.update({
          where: {
            id : parseInt(id),
          },
          data: {
            countryName : country?.countryName,
            waterQuality : country?.waterQuality,
            waterComsumption : country?.waterComsumption,
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
