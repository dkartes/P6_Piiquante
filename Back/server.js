const express = require("express");
// on appel notre .env qui contient nos variables d'environnement
require("dotenv").config({ path: "./config/.env" });
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
