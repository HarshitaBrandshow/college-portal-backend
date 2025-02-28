const express = require("express");

const router = express.Router();

const { CollegeController } = require("../controller");

router.post("/add-college", CollegeController.createCollege);
router.get("/all-colleges", CollegeController.getAllColleges);
router.get("/:id", CollegeController.getCollegeById);
router.put("/:id", CollegeController.updateCollege);
router.delete("/:id", CollegeController.deleteCollege);

module.exports = router;
