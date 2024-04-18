const modelData = require('../Controllers/SchemaModel');

const forgotPassword = async (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
        const user = await modelData.findOne({ userName: email });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        // Compare the provided password with the password stored in the database
        if (password === user.password) {
            const updatedUser = await modelData.updateOne({ userName: email }, { $set: { password: newPassword } });
            return res.status(200).send({ message: "Password updated successfully" });
        } else {
            return res.status(400).send({ error: "Current password is incorrect" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

module.exports = forgotPassword;
