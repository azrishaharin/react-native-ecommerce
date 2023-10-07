const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://azrishaharin94:DssIRRs5mgLcrGDz@cluster0.2nwa3no.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
        console.log("Error connecting to MongoDB", err)
    })

app.listen(port, () => {
    console.log("Server is running on port " + port.toString);
})

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "azrishaharin94@gmail.com", // generated ethereal user
            pass: "tltw mnbf cvvg gyjs", // generated ethereal password
        },
    });
    //compose the email message
    const message = `
        <h1>Welcome to our App!</h1>
        <p>Thank you for registering with us. Please verify your email address by clicking on the link below:</p>
        <a href="http://localhost:8000/verify/${verificationToken}">Verify Email Address</a>
    `;
    //send the email
    try {
       await transporter.sendMail({
            from: "azrishaharin94@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Email Verification", // Subject line
            html: message, // html body
        })
    } catch (err) {
        return res.status(500).json({ message: 'Email could not be sent, ' + err.message });
    }
}

//endpoint to register in the app
const User = require("./models/user");
const Order = require("./models/order");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //create new user
        const user = new User({ name, email, password });

        //generate and store the verification token
        const verificationToken = crypto.randomBytes(16).toString("hex");
        user.verificationToken = verificationToken;

        //save the user to the database
        await user.save();

        sendVerificationEmail(user.email, user.verificationToken);
        return res.status(200).json({ message: "Registration successful" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Registration failed, ' + err });
    }
}
)

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) {
            return res.status(400).json({ message: "Invalid token" });
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        return res.status(200).json({ message: "Email verified" });
    }
    catch (err) {
        return res.status(500).json({ message: 'Verification failed, ' + err.message });
    }
})

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString("hex");
}

const secretKey = generateSecretKey();

//endpoint to login the user
app.post("/login", async (req, res) => {
    console.log("waiting for process..")
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if(user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (!user.verified) {
            return res.status(400).json({ message: "Please verify your email address" });
        }
        const token = jwt.sign({ userId: user._id }, secretKey);
        return res.status(200).json({ message: "Login successful", token: token });
    }
    catch (err) {
        return res.status(500).json({ message: 'Login failed, ' + err });
    }
})