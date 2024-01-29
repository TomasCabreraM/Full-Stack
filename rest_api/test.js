import axios from "axios";
import express from "express";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const bearerToken = "96293482-5dee-4532-a56d-762905769054";

// Configuración de Axios
const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },
};

// Configurar motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Asegúrate de que la ruta a tus vistas sea correcta

// Ruta principal
app.get("/", (req, res) => {
    console.log("Accediendo a la ruta /");
    res.render("index.ejs", { content: "API Response" });
});

// Ruta para GET
app.get("/get-get", async (req, res) => {
    try {
        console.log("Realizando solicitud GET");
        const result = await axios.get(API_URL + '/secrets/51', config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.error("Error en solicitud GET: ", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

// Ruta para POST
app.get("/get-post", async (req, res) => {
    try {
        console.log("Realizando solicitud POST");
        const result = await axios.post(API_URL + '/secrets', {
            "secret": "This is a new secret.",
            "score": 3
        }, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.error("Error en solicitud POST: ", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

// Ruta para PUT
app.get("/get-put", async (req, res) => {
    try {
        console.log("Realizando solicitud PUT");
        const result = await axios.put(API_URL + '/secrets/51', {
            "secret": "This is an updated secret.",
            "score": 4
        }, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.error("Error en solicitud PUT: ", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

// Ruta para PATCH
app.get("/get-patch", async (req, res) => {
    try {
        console.log("Realizando solicitud PATCH");
        const result = await axios.patch(API_URL + '/secrets/51', {
            "score": 5
        }, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.error("Error en solicitud PATCH: ", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

// Ruta para DELETE
app.get("/get-delete", async (req, res) => {
    try {
        console.log("Realizando solicitud DELETE");
        const result = await axios.delete(API_URL + '/secrets/51', config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        console.error("Error en solicitud DELETE: ", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
