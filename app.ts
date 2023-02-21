import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.

const cors = require('cors');


const app = express()
app.use(express.json(), cors())

const PORT = process.env.PORT || 3030

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


app.post("/users", async (req, res) => {
    try {
      const { email, name, password } = req.body
      // games is an array of string | string[]
      const user = await prisma.user.create({
       data: {
            email,
            name,
            password
        }, 
      })
      console.log(user)
      res.json()
    } catch (error: any) {
      console.log(error.message)
      res.status(500).json({
        message: "Internal Server Error",
      })    
    }
  })
  app.get("/lol", async (req, res) => {
    const user = await prisma.user.findMany()
    res.json(user)
})


  app.get("/users", async (req, res) => {
    try {
        const user = await prisma.user.findMany()

        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

app.post("/votes/create/", async (req, res) => {
    try {
      const { water_vote, userId } = req.body;
      console.log(req.body)
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
  
  app.post("/countries/create/", async (req, res) => {
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

app.get("/countries/get", async (req, res) => {
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

app.post("/continent/create", async (req, res) => {
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

  app.get("/continent/get", async (req, res) => {
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


export{app}

