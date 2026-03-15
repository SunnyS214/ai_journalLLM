require('dotenv').config()
const cors= require('cors')
const express= require("express")
const connect_db = require('./services/db')
const app= express()
const port= process.env.PORT||3000

app.use(express.json())
const journalRoutes = require("./routes/journalRoutes");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// routes
app.use("/api" , journalRoutes )


// db
const db= connect_db
db()

app.get("/" ,(req ,res)=>{
    res.send("home route")
} )

app.listen(port, ()=>{
    console.log('app listen on port ' , port )
})