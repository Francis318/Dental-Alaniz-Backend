const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({ email, password: hashedPassword });
    })
    .then((user) => {
      res.status(201).send({ email: user.email });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ message: "Error al crear usuario", error: err.message }),
    );
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Correo o contraseña incorrectos"));
      }
      return user.matchPassword(password);
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = { login, createUser };
