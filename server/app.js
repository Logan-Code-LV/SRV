const express = require("express")
const clientsRoutes = require("./routes/clients")
const protectedRoutes = require("./routes/protected")
const jobRoutes = require("./routes/jobs")
const viewjobposts = require("./routes/viewjobposts")
const expressjwt = require("express-jwt")
const config = require("config")

const app = express()
const port = 3001
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", clientsRoutes)
app.use("/api", jobRoutes)
app.use("/api", viewjobposts)
app.use("/api", expressjwt({ secret: config.get("secret") }), protectedRoutes)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
})

app.use("/api", clientsRoutes)
app.use("/api", expressjwt({ secret: config.get("secret") }), protectedRoutes)
app.use(function(req, res, next) {
  next(createError(404))
})
app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err
  })
})

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
