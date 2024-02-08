import express from "express";

const app = express()

// import router
import s3Router from "./routers/router.s3.js"

app.use("/api/v1/file", s3Router)

export { app }