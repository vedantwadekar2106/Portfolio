require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Admin = require("../models/Admin");

const createAdmin = async () => {

    try {

        await connectDB();

        const adminExists = await Admin.findOne({
            email: "admin@vedant.dev",
        });

        if (adminExists) {

            console.log("✅ Admin Already Exists");

            process.exit();

        }

        await Admin.create({
            name: "Vedant Wadekar",
            email: "admin@vedant.dev",
            password: "Vedant@123",
        });

        console.log("🎉 Admin Created Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

createAdmin();