require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");

async function seedAdmin() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        const existingAdmin = await Admin.findOne({
            email: "admin@vedant.dev"
        });

        if (existingAdmin) {

            existingAdmin.name = "Vedant Wadekar";

            // Plain password here.
            // Your pre("save") hook will hash it automatically.
            existingAdmin.password = "Admin@123";

            existingAdmin.role = "admin";

            await existingAdmin.save();

            console.log("✅ Admin password updated.");

        } else {

            await Admin.create({

                name: "Vedant Wadekar",

                email: "admin@vedant.dev",

                password: "Admin@123",

                role: "admin"

            });

            console.log("✅ Admin created.");

        }

        console.log("");
        console.log("=================================");
        console.log("Email    : admin@vedant.dev");
        console.log("Password : Admin@123");
        console.log("=================================");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
}

seedAdmin();