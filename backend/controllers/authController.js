const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");


// Login
exports.loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const admin = await Admin.findOne({ email });

        // ADD THESE TWO LINES HERE
        console.log("Email entered:", email);
        console.log("Admin found:", admin);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        res.status(200).json({
            success: true,
            token: generateToken(admin),
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Profile

exports.getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        admin: req.admin,
    });

};