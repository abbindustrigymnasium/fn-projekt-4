import express from "express"
import prisma from "./prisma" // importing the prisma instance we created.

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.post("/users", async (req, res) => {
    try {
      const { email, name, password } = req.body
      // games is an array of string | string[]
      const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password
        },
      })
      res.json(newUser)
    } catch (error: any) {
      console.log(error.message)
      res.status(500).json({
        message: "Internal Server Error",
      })    
    }
  })

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.json(users)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})
app.get("/", async (req, res) => {
  try {
      const content = await prisma.user.findMany()

      res.json(content)
  } catch (error) {
      res.status(500).json({
          message: "Something went wrong",
      })
  }
})