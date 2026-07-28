const express = require("express");

const router = express.Router();

const { createContact } = require("../controllers/contactController");

const {
    contactValidation,
    validate,
} = require("../middleware/validator");

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Contact API Working 🚀",
    });
});

router.post(
    "/",
    contactValidation,
    validate,
    createContact
);

module.exports = router;