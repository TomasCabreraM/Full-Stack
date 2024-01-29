import express from "express";

const app = express();
const port = 3000;

const docJSON = '[{"activity": "Start a garden","availability": 0.35,"type": "recreational","participants": 1,"price": 0.3,"accessibility": "Major challenges","duration": "hours","kidFriendly": true,"link": "","key": "1934228"}]'

let data;

data = JSON.parse(docJSON)[0];

app.get("/", (req, res) => {
    res.render("index.ejs", {docData: data});
})

app.listen(port, () =>{
    console.log("Server is running on port 3000")
})