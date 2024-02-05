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

var problem = "";

app.get("/", async (req, res) => {
    const names = await getStates();
    res.render("index.ejs", {names: names, problem: problem})
})

app.post("/submit", async (req, res) => {
    const newState = req.body["newState"];
    try{
        problem = "";
    await db.query("INSERT INTO states (name) VALUES ($1)", [newState,]);
    res.redirect('/');
    }catch(err){
        console.log(err);
        problem = "Value was not inserted, ensure it is a string and not in use"
        res.redirect('/');
    }
})

app.post("/delete", async (req, res) => {
    const newState = req.body["deleteState"];
    try{
        problem = "";
    await db.query("DELETE FROM states WHERE name = ($1)", [newState,]);
    res.redirect('/');
    }catch(err){
        console.log(err);
        problem = "Value was not inserted, ensure it is a string and not in use"
        res.redirect('/');
    }
})

app.post("/update", async (req, res) => {
    const newState = req.body["updatedState"];
    const updatedState = req.body["theUpdate"];
    try{
        problem = "";
    await db.query("UPDATE states SET name = ($2) WHERE name = ($1)", [newState,updatedState]);
    res.redirect('/');
    }catch(err){
        console.log(err);
        problem = "Value was not inserted, ensure it is a string and not in use"
        res.redirect('/');
    }
})

app.listen(port, () => {
    console.log("Server is running on port 3000")
})
