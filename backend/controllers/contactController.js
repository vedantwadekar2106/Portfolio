const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const createContact = async (req, res, next) => {
    try {

        const { fullName, email, phone, message } = req.body;

        const contact = await Contact.create({
            fullName,
            email,
            phone,
            message,
        });

        /*
        Email to Vedant
        */

        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: "📩 New Portfolio Contact",

            html: `
                <h2>New Portfolio Contact</h2>

                <p><strong>Name:</strong> ${fullName}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `,
        });

        /*
        Auto Reply
        */

        await sendEmail({

            to: email,

            subject: "Thank you for contacting me",

            html: `
                <h2>Hello ${fullName},</h2>

                <p>

                Thank you for contacting me.

                </p>

                <p>

                I have received your message.

                I'll reply within 24 hours.

                </p>

                <br>

                Regards,

                <br>

                <strong>Vedant Wadekar</strong>
            `,
        });

        res.status(201).json({

            success: true,

            message: "Message Sent Successfully",

            data: contact,
        });

    } catch (error) {

        next(error);

    }
};

module.exports = {

    createContact,

};