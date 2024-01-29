import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = '';


app.get("/", (req, res) => {
    console.log("Accediendo a la ruta /");
    res.render("index.ejs", { content: "API Response" });
});

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/random",(req, res) =>{
    const randomIndex = Math.floor(Math.random()*items.length)
    res.json(items[randomIndex]);
})

app.get("/item/:id",(req, res) =>{
    const id = parseInt(req.params.id);
    const foundItem = items.find((item) => item.id === id)
    res.json(foundItem);
})
app.get("/filter",(req, res) =>{
    const type = req.query.type;
    const filterItemTypes = items.filter((item)  => item.type === type);
    res.json(filterItemTypes);
})

//////////////////////////////

app.post("/items", (req, res) => {
    const newItem = {
        id: items.length + 1,
        itemsText: req.body.itemText,
        type: req.body.type,
    };
    items.push(newItem);
    console.log(items.slice(-1));
    res.json(newItem);
})

app.listen(port,()=>{
    console.log("Server is running on port 3000")
})

var items = [
{
    id:1,
    itemText: "I am the items text",
    type: "word",
},
{
    id:2,
    itemText: "I am the items text",
    type: "cat",
},
{
    id:3,
    itemText: "I am the items text",
    type: "dog",
}
]