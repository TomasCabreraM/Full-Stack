import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "newDatabase",
    password: "1414",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

async function getStates(){
    let result = await db.query("SELECT name FROM states ");
    let names = [];
    result.rows.forEach((aName) =>{
        names.push(aName.name);
    })
    return names;
}

app.get("/", async (req, res) => {
    const names = await getStates();
    res.render("index.ejs", {names: names})
})

app.post("/submit", async (req, res) => {
    const newState = req.body["newState"];
    await db.query("INSERT INTO states (name) VALUES ($1)", [newState,]);
    res.redirect('/');
})

app.listen(port, () => {
    console.log("Server is running on port 3000")
})
