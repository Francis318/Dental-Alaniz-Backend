const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          v,
        );
      },
      message: "El formato de la imagen debe ser una URL válida",
    },
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
