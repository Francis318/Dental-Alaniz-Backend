require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const doctorRoutes = require("./routes/doctors");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/dental-alaniz")
  .then(() => console.log("Base de datos conectada con éxito"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use("/doctors", doctorRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("API de Clínica Dental Alaniz funcionando ");
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
