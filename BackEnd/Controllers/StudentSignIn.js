const modelData=require('./StudentDataModel');
const jwt = require('jsonwebtoken');

const studentSignInData = async (req, res) => {
    const { userName, password } = req.params;
    
    try {
        const dbData = await modelData.findOne({ email:userName });
        
        if (!dbData) {
            return res.status(404).send({error:"User not found"});
        }

        if (password === dbData.password) {
            // res.status(200).send(dbData);
            
            res.status(200).json({ token: "ijaz" });
        } else {
            res.status(401).send({message:"Invalid password"});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({error:"Internal Server Error"});
    }
};

module.exports=studentSignInData;