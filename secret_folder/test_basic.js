import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client ({
    user: "postgres",
    host: "localhost",
    database: "secretDatabase",
    password: "1414",
    port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var problem = "";
var searched_user = [];

app.get("/", async (req, res) => {
    res.render('home.ejs');
})

app.get("/log_in", async (req, res) => {
    res.render('log_in.ejs', {problem: problem});
})

app.get("/create_account", async (req, res) => {
    res.render('create_account.ejs', {problem: problem});
})

// app.post("/log-into-account", async (req, res) => {

//     const new_username = req.body["input-username"];
//     const new_password = req.body["input-password"];

//     searched_user = await db.query("SELECT * FROM secretDB WHERE usernames ILIKE $1", [new_username]);
//     searched_user = searched_user.rows;

//     if(searched_user.length == 0){
//         problem = `username or password incorrect`
//         res.render("log_in.ejs", {problem: problem})
//     } else{
//         if(searched_user[0].usernames === new_username && searched_user[0].passwords === new_password){
//         res.render("secret.ejs", {problem: problem})
//         } else{
//             problem = `username or password incorrect`
//             res.render("log_in.ejs", {problem: problem})
//         }
//     }
// })

app.post("/log-into-account", async (req, res) => {
    const new_username = req.body["input-username"];
    const new_password = req.body["input-password"];

    try {
        const result = await db.query("SELECT * FROM secretDB WHERE usernames = $1 AND passwords = $2", [new_username, new_password]);
        const searched_user = result.rows;

        if (searched_user.length === 1) {
            res.render("secret.ejs", { problem: problem });
        } else {
            problem = "Username or password incorrect";
            res.render("log_in.ejs", { problem: problem });
        }
    } catch (err) {
        console.error("Error during login:", err);
        problem = "A server error occurred";
        res.render("log_in.ejs", { problem: problem });
    }
});


app.post("/create-new-account", async (req, res) => {
    const new_username = req.body["input-username"];
    const new_password = req.body["input-password"];

    searched_user = await db.query("SELECT * FROM secretDB WHERE usernames = ($1)", [new_username]);
    searched_user = searched_user.rows;

    if(searched_user.length == 0){
        try{
            await db.query("INSERT INTO secretDB (usernames, passwords) VALUES ($1, $2)", [new_username, new_password]);
            res.render("secret.ejs", {problem: problem})
        } catch(err){
            console.log(err);
            problem = "Value was not inserted, a server error has ocurred"
            res.render('create_account.ejs', {problem: problem});
        }

    } else {
        problem = `username ${new_username} is not available`;
        res.render('create_account.ejs', { problem: problem });
        problem = ""; // Reset the problem variable
    }
})

app.get("/log_out", async (req, res) => {
    res.render('home.ejs');

})

app.listen(port, () => {
    console.log("Server is running on port 3000")
})