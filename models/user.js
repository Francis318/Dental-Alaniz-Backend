const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password).then((matched) => {
    if (!matched) {
      return Promise.reject(new Error("Correo o contraseña incorrectos"));
    }
    return this;
  });
};

module.exports = mongoose.model("User", userSchema);
