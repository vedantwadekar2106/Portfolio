const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (options) => {
    try {
        await transporter.verify();
        console.log("✅ SMTP connection verified");

        const info = await transporter.sendMail({
            from: `"Vedant Portfolio" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

        console.log("✅ Email sent:", info.messageId);
    } catch (err) {
        console.error("❌ Nodemailer Error:", err);
        throw err;
    }
};

module.exports = sendEmail;