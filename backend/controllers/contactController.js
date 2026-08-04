const Contact = require("../models/Contact");

const createContact = async (req, res, next) => {
    try {
        const { fullName, email, phone, message } = req.body;

        const contact = await Contact.create({
            fullName,
            email,
            phone,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Message saved successfully",
            data: contact,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createContact,
};