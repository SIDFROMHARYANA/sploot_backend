const UserModel = require('../Models/User')
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require('validator');


function isEmail(emailAddress)
{
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // w use for char * use for breakpoint $ for end
        if (regex.test(emailAddress))
            return true;
        else
            return false;

}

  const createUser = async (req, res) => {
    try {
        let body = req.body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ Error: "Body should be not empty" })
        }
       const {name, age , email, password} = body

        if(!(name && age && email && password)){
            return res.status(400).send({status:false,message:"name ,age ,email and password are required fields"})
        }
       
        
        let emailvalid = isEmail(body.email)
        if (emailvalid == false) {
            return res.status(400).send({ status: false, msg: "Invalid email ! please enter valid email address ! " })
        }
        if (!validator.isStrongPassword(body.password)) {
            return res.status(400).send({ status: false, msg: "Password must be contain 1 uppercase 1 lowercase special char and min 8 length" })
        }

        // const saltRounds = 10;
        // const encryptedPassword = await bcrypt.hash(password, saltRounds);
        // data["password"] = encryptedPassword;

        let checkemail = await UserModel.findOne({email:body.email})
        if(checkemail){
            return res.status(400).send({status:false,msg:"Email already exit"})
        }
        
        let data = new UserModel(req.body)
        let result = await data.save()
        res.status(201).send({ status: true, data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        let data = req.body
       
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Email and Password Required !" })
        
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })
        
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })
        
        const user = await UserModel.findOne({ email: email, password: password })
        
        if (!user) return res.status(401).send({ status: false, msg: "Email or Password Invalid Please try again !!" })
        
        // const decrypPassword = user.password;
        // const pass = await bcrypt.compare(password, decrypPassword);
        // if (!pass) {
        //     return res.status(400).send({ status: false, message: "Password Incorrect" });
        // }
        
        
        const token = jwt.sign({
            userId: user._id.toString(),
            company: "sploot",

        }, "this is a secreat key")
        res.setHeader("x-api-key", token)

        res.status(200).send({ status: true, data:{token:token} })
    }

    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const userUpdate = async (req, res) => {
    try {
        let name = req.body.name
        let age = req.body.age
        
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not empty" })
        }
              
        
        user = await articlemodel.findOneAndUpdate({ _id: id }, { $set: { name: name, age: age} }, { new: true });
        res.status(200).send({ status: true, message:"Success", data:user })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createUser = createUser
module.exports.login = login
module.exports.userUpdate = userUpdate



