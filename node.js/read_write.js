const fs = require("fs");

fs.writeFile("messaje.txt","texto de prueba", (err) => {
    if (err) throw err;
    console.log("The file has been saved");
});

fs.readFile('./messaje.txt', "utf8",(err, data) => {
    if (err) throw err;
    console.log(data);
  });