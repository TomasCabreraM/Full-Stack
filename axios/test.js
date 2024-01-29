import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

app.get("/", async (req, res) =>{
    try{
        const response = await axios.get("https://bored-api.appbrewery.com/random")
        res.render("index.ejs", {activity: response.data});
    } catch (error){
        console.error("Failed to make request", error.message);
        res.status(500).send("Failed to fatch activity, please try again")
    }
})

app.post("/", async (req, res) =>{ 
    try{
        const theNumber = 3943506;
        const response = await axios.get(`https://bored-api.appbrewery.com/activity/${theNumber}`)
        res.render("index.ejs", {activity: response.data});
    } catch (error){
        console.error("Failed to make request", error.message);
        res.status(500).send("Failed to fatch activity, please try again")
    }
})

app.listen(port, () =>{
    console.log("This is running on port 3000")
})



