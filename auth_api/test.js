import axios from "axios";
import express from "express";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const theUsername = "usuariopruebador1"
const thePassword = "clavepruebadora1"
const APIkey = "67f8e2ce-5866-4187-86d1-ecb2599c6b8b";
const bearerToken = "b1b9901a-7246-4b68-9ff1-f7256d953ea6"

app.get("/",(req,res) =>{
    res.render("index.ejs", {content: "API response"});
})

app.get("/noAuth", async (req, res) =>{
    try{
        const result = await axios.get(API_URL + "/random")
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    }catch{
        res.status(400).send("error", error.message)
    }
})

app.get("/basicAuth", async (req, res) =>{
    try{
        const result = await axios.get(API_URL + "/all?page=2",{
            auth:{
                username: theUsername,
                password: thePassword,
            },
        })
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    }catch{
        res.status(400).send("error", error.message)
    }
})
app.get("/apiKey", async (req, res) =>{
    try{
        const result = await axios.get(API_URL + "/filter",{
            params:{
                score: 7,
                apiKey: APIKey,
            },
        })
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    }catch{
        res.status(400).send("error", error.message)
    }
})

const config = {
    headers: { Authorization:`bearer${bearerToken}`},};

app.get("/bearerToken", async (req, res) =>{
        try{
            const result = await axios.get(API_URL + "/secrets/2",config);
            res.render("index.ejs", {content: JSON.stringify(result.data)});
        }catch{
            res.status(400).send("error", error.message)
        }
    })

app.listen(port, () => {
    console.log("Server is running on port 3000")
})
