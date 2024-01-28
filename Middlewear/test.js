import Express from "express";

const app = Express();
const port = 3000;

app.use((req, res, next) =>{
    console.log("Request method:", req.method);
    console.log("Request method:", req.url);
    next();
})

app.get("/",(req, res) =>{
    res.send("Hello");
})

app.listen(port, () =>{
    console.log("Listening on port 3000");
})