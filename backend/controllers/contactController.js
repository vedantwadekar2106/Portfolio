const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const createContact = async (req, res, next) => {
    console.log("1. Request received");

    try {
        const { fullName, email, phone, message } = req.body;

        console.log("2. Data received");

        const contact = await Contact.create({
            fullName,
            email,
            phone,
            message,
        });

        console.log("3. Contact saved");

        console.log("4. Sending admin email...");
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: "Test",
            html: "<h1>Test</h1>",
        });

        console.log("5. Admin email sent");

        console.log("6. Sending user email...");
        await sendEmail({
            to: email,
            subject: "Test",
            html: "<h1>Test</h1>",
        });

        console.log("7. User email sent");

        return res.status(201).json({
            success: true,
            message: "Success"
        });

    } catch (err) {
        console.error("ERROR:", err);
        next(err);
    }
};

module.exports = { createContact };