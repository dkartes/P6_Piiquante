const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
// on appel notre .env qui contient nos variables d'environnement
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/auth", userRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
