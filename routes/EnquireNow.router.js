const express = require('express');
const router = express.Router();

const  { EnquireNowController } = require('../controller'); 

router.post("/create", EnquireNowController.createEnquiry); // Create
router.get("/enquiries", EnquireNowController.getAllEnquiries); // Read all
router.get("/:id", EnquireNowController.getEnquiryById); // Read one by ID
router.put("/:id", EnquireNowController.updateEnquiry); // Update
router.delete("/:id", EnquireNowController.deleteEnquiry); // Delete (soft delete)

module.exports = router;
