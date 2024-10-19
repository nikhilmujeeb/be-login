const router = require("express").Router();
const { User } = require("../models/user"); // Ensure this path is correct
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// Login route
router.post("/login", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        // Compare password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        // Generate authentication token
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error logging in:", error); // Log the error for debugging
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Validation schema for login
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
