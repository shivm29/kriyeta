import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { username, email, password, mobile } = req.body

        if (!username) {
            return res.send("username required")
        }
        if (!email) {
            return res.send("email required")
        }
        if (!password) {
            return res.send("password required")
        }
        if (!mobile) {
            return res.send("phone required")
        }

        const notAllowedChars = [" ", "*", "$", "@", "&", ")", "(", "+", "-"]

        for (let i = 0; i < username.length; i++) {
            if (notAllowedChars.includes(username[i])) {
                return res.send("Invalid username");
            }
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(408).send({
                success: false,
                message: "User Already Exists"
            })
        }
        // converting userpassword to hash
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            username, email, password: hashedPassword, mobile
        }).save()

        res.status(201).send({
            success: true,
            message: "User Successfully Registered",
            user
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration"
        })

    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = await req.body;

        if (!email) return res.status(404).send({ error: 'Invalid email or password' })
        if (!password) return res.status(404).send({ error: 'Invalid email or password' })

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User do not exist Please register'
            })
        }
        const match = await comparePassword(password, existingUser.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // JWT Token
        const token = await JWT.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })


        res.status(201).send({
            success: true,
            message: 'Logged in successfully',
            user: {
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            },
            token,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}