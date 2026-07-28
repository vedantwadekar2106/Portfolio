const { body, validationResult } = require("express-validator");

const contactValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full Name must be between 3 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email address"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone Number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone Number must be exactly 10 digits")
        .isNumeric()
        .withMessage("Phone Number must contain only numbers"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Message must be between 10 and 1000 characters"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

module.exports = {
    contactValidation,
    validate,
};