const modelData = require('../Controllers/StudentDataModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const StudentData = async (req, res) => {
    try {
        const { name, rollNo, mobileNo, email, userId, password } = req.body;

        const decodedToken = jwt.decode(userId);
        const userIdString = decodedToken.userId;
        const data = new modelData({ "name": name, "rollNo": rollNo, "mobileNo": mobileNo, "email": email, "userId": userIdString, "password": password });
        const result = await data.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: true, // Set to true for Gmail
            auth: {
                user: "seebiz.bpt0623.evdev.6@gmail.com",
                pass: "pswo pfee jpha kyjc"
            },
            requireTLS: true // Require TLS for Gmail
        });

        const mailOptions = {
            from: {
                name: "Ijaz Akbar",
                address
            },
            to: email,
            subject: "Send Mail using Nodemailer",
            text: `Your Password is ${password}`
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

        res.status(200).json({ message: 'Data saved successfully', data: result });
    } catch (error) {
        console.error("Error in sending data:", error);
        res.status(500).json({ message: 'Data cant be sent', data: error });
    }
};

module.exports = StudentData;
