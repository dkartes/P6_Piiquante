const express = require("express");
const userRoutes = require("./routes/user.routes");
// on appel notre .env qui contient nos variables d'environnement
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Specifying specific access control headers for all the response objects to allow cross-origin requests (and prevent CORS errors) */
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

// routes
app.use("/api/auth", userRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

module.exports = app;
