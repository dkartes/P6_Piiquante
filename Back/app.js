const express = require("express");
const userRoutes = require("./routes/user.routes");
const saucesRoutes = require("./routes/sauces.routes");
// on appel notre .env qui contient nos variables d'environnements
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Accès headers suite au partage des ressources entre origines multiples pour permettre aux users d'accèder aux ressources. (évite les erreurs CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// routes users
app.use("/api/auth", userRoutes);
//routes sauces
app.use("/api/sauces", saucesRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

module.exports = app;
