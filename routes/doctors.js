const router = require("express").Router();
const {
  getDoctors,
  createDoctor,
  deleteDoctor,
} = require("../controllers/doctors");
const auth = require("../middlewares/auth");

router.get("/", getDoctors);
router.post("/", auth, createDoctor);
router.delete("/:doctorId", auth, deleteDoctor);

module.exports = router;
