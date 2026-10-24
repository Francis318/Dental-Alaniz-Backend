const Doctor = require("../models/doctor");

const getDoctors = (req, res) => {
  Doctor.find({})
    .then((doctors) => res.status(200).send(doctors))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error al obtener los doctores", error: err.message }),
    );
};

const createDoctor = (req, res) => {
  const { name, specialty, description, education, schedule, image } = req.body;

  Doctor.create({ name, specialty, description, education, schedule, image })
    .then((doctor) => res.status(201).send(doctor))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos", error: err.message });
      }
      res
        .status(500)
        .send({ message: "Error en el servidor al crear el doctor" });
    });
};

const deleteDoctor = (req, res) => {
  const { doctorId } = req.params;

  Doctor.findByIdAndDelete(doctorId)
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).send({ message: "Doctor no encontrado" });
      }
      res.status(200).send({ message: "Doctor eliminado con éxito", doctor });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de doctor inválido" });
      }
      res
        .status(500)
        .send({ message: "Error en el servidor al eliminar el doctor" });
    });
};

module.exports = { getDoctors, createDoctor, deleteDoctor };
