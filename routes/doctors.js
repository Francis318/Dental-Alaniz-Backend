const router = require("express").Router();
const {
  getDoctors,
  createDoctor,
  deleteDoctor,
} = require("../controllers/doctors");

router.get("/", getDoctors);

router.post("/", createDoctor);

router.delete("/:doctorId", deleteDoctor);

module.exports = router;
