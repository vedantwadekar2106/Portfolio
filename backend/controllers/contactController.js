const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const createContact = async (req, res, next) => {
    try {
        const { fullName, email, phone, message } = req.body;

        // Save contact in MongoDB
        const contact = await Contact.create({
            fullName,
            email,
            phone,
            message,
        });

        try {
            // Email to Admin
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

            // Auto Reply to User
            await sendEmail({
                to: email,
                subject: "Thank you for contacting Vedant",
                html: `
                    <h2>Hello ${fullName},</h2>

                    <p>Thank you for contacting me.</p>

                    <p>
                        I have successfully received your message and
                        I will get back to you within 24 hours.
                    </p>

                    <br>

                    <p>
                        Regards,<br>
                        <strong>Vedant Wadekar</strong>
                    </p>
                `,
            });

            console.log("✅ Emails sent successfully.");

        } catch (emailError) {

            console.error("❌ Email Error:", emailError);

            // Contact is already saved, so don't fail the whole request.
        }

        return res.status(201).json({
            success: true,
            message: "Message submitted successfully.",
            data: contact,
        });

    } catch (error) {
        console.error("❌ Contact Controller Error:", error);
        next(error);
    }
};

module.exports = {
    createContact,
};