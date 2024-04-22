const modelData = require('../Controllers/SchemaModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await modelData.findOne({ userName: email }); // Corrected field to 'userName'

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: '7h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "seebiz.bpt0623.evdev.6@gmail.com",
                pass: "pswo pfee jpha kyjc"
            }
        });

        const mailOptions = {
            from: "Ijaz Akbar <seebiz.bpt0623.evdev.6@gmail.com>",
            to: email,
            subject: "Password Reset Request",
            html:`<a href="http://localhost:8000/forget-password?token=${token}">Reset Password</a>`
        };

        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent successfully");
            } catch (error) {
                console.error("Error sending email:", error);
            }
        };

        await sendMail(transporter, mailOptions);

        res.status(200).json({ message: 'Password reset token sent successfully' });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



const resetPassword = (req, res) => {
    try {
        const token=req.query.token;
        res.redirect(`/index.html?token=${token}`);
    } catch (error) {
        console.error("Error redirecting:", error);
    }
}

const newPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        const verifyToken = jwt.verify(token, "your_secret_key"); // Assuming "your_secret_key" is your actual secret key
        const data = await modelData.findOne({ _id: verifyToken.userId });
        if (password !== confirmPassword) { // Corrected the condition to check if passwords match
            return res.status(400).send({ error: "Passwords do not match!" }); // Changed status code to 400 for bad request
        } else {
            await modelData.updateOne({ _id: verifyToken.userId }, { $set: { password: password } }); // Updated to use correct user ID and password
            return res.status(200).send({ data: "Password Updated Successfully!" }); // Removed extra 'send' and fixed status code
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


module.exports = {forgotPassword,resetPassword,newPassword}