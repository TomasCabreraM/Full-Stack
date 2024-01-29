import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("Public"));

app.get("/", (req, res) =>{
    res.render("test.ejs");
})

app.post("/submit", (req, res) =>{
    const fname = req.body["firstName"]
    res.render("result.ejs", {firstNameValue: fname});
})

app.listen(port, () => {
    console.log("Running on port 3000");
})