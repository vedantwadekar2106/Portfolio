require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

/*
=====================================
Database
=====================================
*/

connectDB();

/*
=====================================
Middlewares
=====================================
*/

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
];

app.use(
    cors({
        origin: function (origin, callback) {

            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/*
=====================================
Rate Limiter
=====================================
*/

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Try again later.",
    },
});

app.use(limiter);

/*
=====================================
Routes
=====================================
*/

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend Running 🚀",
    });
});

/*
Contact Routes
*/

app.use("/api/contact", require("./routes/contactRoutes"));


app.use("/api/auth", require("./routes/authRoutes"));
/*
=====================================
404
=====================================
*/

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

/*
=====================================
Server
=====================================
*/
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});

