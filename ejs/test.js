import express from "express";

const app = express();
const port = 3000;

let pets = ["dog", "cat", "fish"];

app.get("/",(req, res) =>{
    res.render("test.ejs", {myNumber: "20", names: pets});
})

app.listen(port, () =>{
    console.log("Running on port 3000")
})