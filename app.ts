import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.

const cors = require('cors');


const app = express()
app.use(express.json(), cors())

const PORT = process.env.PORT || 3030

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



//Users 
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








  //Countries

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

app.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await prisma.country.findUnique({
      where: {
        id : parseInt(id),
      }
    })


    res.json(country)
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





//Continents 

app.post("/continents", async (req, res) => {
  try {
    const { continentName, waterQuality, waterComsumption } = req.body
    
    let userScore = 0;

    const newContinent = await prisma.continent.create({
      data: {
        continentName,
        waterQuality,
        waterComsumption : waterComsumption,
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
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      message: "Something went wrong",
    })
  }
})

app.get("/continents/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const continent = await prisma.continent.findUnique({
      where: {
        id : parseInt(id),
      }
    })


    res.json(continent)
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



