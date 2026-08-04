const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(options) {

    try {

        console.log("Sending email to:", options.to);

        const info = await transporter.sendMail({
            from: `"Vedant Portfolio" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

        console.log("Email sent successfully");
        console.log(info);

        return info;

    } catch (err) {

        console.log("EMAIL ERROR");
        console.log(err);

        throw err;
    }

}

module.exports = sendEmail;