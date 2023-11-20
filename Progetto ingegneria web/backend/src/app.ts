import express, { Express } from "express"
import forumRouter from "./routes/forum-router.ts"

const app: Express = express()
const port: number = 3000

app.use(express.static("public"))

app.use(forumRouter)

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})