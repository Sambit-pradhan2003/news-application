import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
base_url=process.env.BASE_URL





const app =express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import

import  userrouter  from "./routes/user.routes.js"
import articlerouter from "./routes/articles.routes.js"


//routes declaration
app.use("/api/v1/users",userrouter)
app.use("/api/v1/articles",articlerouter)


export {app}