const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tempUserModel = require('../models/tempUser.model')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

async function sendEmailOtp(req, res) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const userAlreadyExist = await userModel.findOne({ email })

        if (userAlreadyExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        await tempUserModel.findOneAndDelete({ email })
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedOtp = await bcrypt.hash(otp, 10)
        const tempToken = crypto.randomBytes(32).toString('hex')

        await tempUserModel.create({
            email,
            emailOtp: hashedOtp,
            tempToken,
            emailOtpExpiry: new Date(Date.now() + 5 * 60 * 1000)
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        })

        console.log("Message ID:", info.messageId)
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info))
        return res.status(200).json({
            message: "OTP sent successfully",
            tempToken
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }

}

async function verifyEmailOtp(req, res) {
    try {
        const { tempToken, tempemailOtp } = req.body

        if (!tempToken || !tempemailOtp) {
            return res.status(400).json({ message: "Email and OTP are required" })
        }

        if (tempemailOtp.length !== 6) {
            return res.status(400).json({ message: "Invalid OTP format" })
        }

        const tempUser = await tempUserModel.findOne({ tempToken })

        if (!tempUser) {
            return res.status(400).json({ message: "No OTP request found" })
        }

        if (tempUser.emailOtpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" })
        }

        const isMatch = await bcrypt.compare(tempemailOtp, tempUser.emailOtp)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        tempUser.isEmailVerified = true
        tempUser.emailOtp = undefined
        tempUser.emailOtpExpiry = undefined
        await tempUser.save()

        return res.status(200).json({
            message: "OTP verified successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

async function saveName(req, res) {
    try {
        const { tempToken, firstName, lastName } = req.body
        if (!tempToken || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const tempUser = await tempUserModel.findOne({ tempToken })

        if (!tempUser) {
            return res.status(400).json({ message: "Invalid session" })
        }

        if (!tempUser.isEmailVerified) {
            return res.status(400).json({ message: "Email not verified" })
        }

        tempUser.firstName = firstName
        tempUser.lastName = lastName
        await tempUser.save()

        return res.status(200).json({
            message: "Name saved successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

async function termsCondition(req, res) {
    try {
        const { tempToken, isTermsAccepted } = req.body

        if (!tempToken || typeof accepted !== "boolean") {
            return res.status(400).json({
                message: "Token and acceptance status required"
            })
        }

        const tempUser = await tempUserModel.findOne({ tempToken })

        if (!tempUser) {
            return res.status(400).json({
                message: "Invalid session"
            })
        }

        if (!tempUser.isEmailVerified) {
            return res.status(400).json({
                message: "Email not verified"
            })
        }

        if (!tempUser.firstName || !tempUser.lastName) {
            return res.status(400).json({
                message: "Name not completed"
            })
        }

        if (!accepted) {
            return res.status(400).json({
                message: "You must accept terms and conditions"
            })
        }

        tempUser.termsAccepted = true
        tempUser.termsAcceptedAt = new Date()

        await tempUser.save()

        return res.status(200).json({
            message: "Terms accepted successfully"
        })



    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}

async function sendPhoneOtp(req, res) {

}

async function verifyPhoneOtp(req, res) {

}

async function registerPassword(req, res) {

}

async function verifyPassword(req, res) {

}



module.exports = {
    sendEmailOtp,
    verifyEmailOtp,
    saveName,
    termsCondition,
    sendPhoneOtp,
    verifyPhoneOtp,
    registerPassword,
    verifyPassword
}