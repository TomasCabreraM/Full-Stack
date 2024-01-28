import express from "express";
const app = express();
const port = 3000;

app.listen(port, () =>{

    console.log("This server is on port 3000")
})

app.get("/", (req, res) => {

    res.send("Hello user");
    res.sendStatus(200)
})
app.post("/login", (req, res) => {
    res.sendStatus(201)
})
