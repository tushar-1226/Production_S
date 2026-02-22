const userModel = require('../models/user.model')
const tempUserModel = require('../models/tempUser.model')
const otpModel = require('../models/loginOtp.model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')

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
      from: `"Uber" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Uber Verification Code</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9fafb;
      color: #111827;
    }
    .wrapper {
      max-width: 560px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
      padding: 48px 32px 40px;
      text-align: center;
      color: white;
    }
    .logo {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: -1px;
      margin: 0;
    }
    .content {
      padding: 40px 32px 48px;
      text-align: center;
    }
    .otp-container {
      background: #f1f5f9;
      border-radius: 16px;
      padding: 32px 24px;
      margin: 32px 0;
      letter-spacing: 12px;
      font-size: 40px;
      font-weight: 700;
      font-family: 'Courier New', Courier, monospace;
      color: #111827;
      border: 2px solid #e2e8f0;
    }
    .otp-hint {
      font-size: 15px;
      color: #6b7280;
      margin: 24px 0 32px;
      line-height: 1.5;
    }
    .footer {
      background: #f8fafc;
      padding: 32px;
      font-size: 13px;
      color: #6b7280;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .small-link {
      color: #374151;
      text-decoration: underline;
      font-weight: 500;
    }
    .highlight {
      color: #000;
      font-weight: 600;
    }
    @media (max-width: 480px) {
      .otp-container {
        font-size: 32px;
        letter-spacing: 8px;
        padding: 24px 16px;
      }
      .content {
        padding: 32px 20px;
      }
    }
  </style>
</head>
<body>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9fafb; padding:40px 0;">
    <tr>
      <td align="center">

        <table class="wrapper" role="presentation">

          <!-- Header -->
          <tr>
            <td class="header">
              <h1 class="logo">Uber</h1>
              <p style="margin:12px 0 0; font-size:17px; opacity:0.9;">
                Sign-in Code
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content">

              <h2 style="margin:0 0 16px; font-size:24px; font-weight:700;">
                Your verification code
              </h2>

              <p style="font-size:16px; margin:0 0 28px; color:#4b5563;">
                Use this code to complete your sign-in.<br>
                It expires in <span class="highlight">10 minutes</span>.
              </p>

              <div class="otp-container">
                ${otp}
              </div>

              <p class="otp-hint">
                If you didn't request this code, you can safely ignore this email.<br>
                Someone may have entered your phone number or email by mistake.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin:0 0 12px;">
                This message was sent to the email or phone number<br>
                associated with your Uber account.
              </p>
              <p style="margin:16px 0 0;">
                <a href="https://help.uber.com" class="small-link">Help</a> •
                <a href="https://www.uber.com/legal/en/document/?name=privacy-notice" class="small-link">Privacy</a> •
                <a href="https://www.uber.com/legal/en/document/?name=general-terms-of-use" class="small-link">Terms</a>
              </p>
              <p style="margin:20px 0 0; font-size:12px;">
                © ${new Date().getFullYear()} Uber Technologies, Inc.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
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

    if (!tempToken || typeof isTermsAccepted !== "boolean") {
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

    if (!isTermsAccepted) {
      return res.status(400).json({
        message: "You must accept terms and conditions"
      })
    }

    if (tempUser.termsAccepted) {
      return res.status(400).json({
        message: "Terms already accepted"
      })
    }

    tempUser.termsAccepted = true
    tempUser.termsAcceptedAt = new Date()

    await tempUser.save()

    return res.status(200).json({
      message: "Terms accepted successfully"
    })

  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

async function registerPassword(req, res) {
  try {
    const { tempToken, password, confirmPassword } = req.body
    if (!tempToken || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      })
    }

    const passwordRegex = /^(?![0-9a])(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters, contain one capital letter, one number, one special character, and cannot start with a number or 'a'"
      })
    }

    const tempUser = await tempUserModel.findOne({ tempToken })
    if (!tempUser) {
      return res.status(400).json({
        message: "Invalid or expired token"
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

    if (!tempUser.termsAccepted) {
      return res.status(400).json({
        message: "Terms not accepted"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await userModel.findOne({ email: tempUser.email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const user = await userModel.create({
      email: tempUser.email,
      firstName: tempUser.firstName,
      lastName: tempUser.lastName,
      password: hashedPassword,
      isEmailVerified: tempUser.isEmailVerified,
      termsAccepted: tempUser.termsAccepted,
      termsAcceptedAt: tempUser.termsAcceptedAt,

    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token)

    // Send welcome email
    await sendEmail(
      tempUser.email,
      "Welcome to Our Platform 🎉",
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Uber – Let's get you moving!</title>
  <style>
    /* Reset styles */
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5; }
    table { border-collapse: collapse; }
    a { color: #000; text-decoration: none; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; }
    .header { background: #000000; color: white; padding: 32px 24px; text-align: center; }
    .content { padding: 32px 24px; line-height: 1.6; color: #333; }
    .btn { 
      display: inline-block; 
      background: #000000; 
      color: white; 
      padding: 14px 32px; 
      border-radius: 8px; 
      font-weight: 600; 
      margin: 20px 0; 
      text-decoration: none;
    }
    .footer { 
      background: #f8f8f8; 
      padding: 24px; 
      text-align: center; 
      font-size: 13px; 
      color: #666; 
      border-top: 1px solid #eee;
    }
    .highlight { color: #000; font-weight: 600; }
  </style>
</head>
<body>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="background: #f5f5f5; padding: 20px 0;">
        
        <table class="container" role="presentation">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to Uber, ${tempUser.firstName}!</h1>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td class="content">
              <p>Hey ${tempUser.firstName},</p>
              
              <p>Thanks for creating your Uber account — you're now all set to ride, eat, send packages, and more.</p>

              <p style="margin: 32px 0 16px; font-size: 18px; font-weight: 600;">
                Get started in 3 quick steps:
              </p>

              <ol style="padding-left: 22px; margin: 8px 0 24px;">
                <li><strong>Add a payment method</strong> — so you're ready to go whenever you need a ride</li>
                <li><strong>Set your home & work locations</strong> — faster bookings every time</li>
                <li><strong>Take your first ride</strong> — and enjoy ₹100–200 off (check Promotions in the app)</li>
              </ol>

              <div style="text-align: center;">
                <a href="https://m.uber.com/ul/?action=setPickup" class="btn" target="_blank">
                  Open Uber app
                </a>
              </div>

              <p style="margin-top: 32px;">
                Questions? Just reply to this email — we're here to help.<br>
                Safe travels!
              </p>

              <p style="margin-top: 40px; font-size: 15px;">
                — The Uber Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>
                Uber Technologies, Inc.<br>
                This email was sent to <span class="highlight">${tempUser.email || 'your email'}</span>
              </p>
              <p style="margin: 16px 0 0;">
                <a href="https://www.uber.com/legal/en/document/?name=privacy-notice&country=united-states&lang=en">Privacy Notice</a> • 
                <a href="https://www.uber.com/legal/en/document/?name=general-terms-of-use&country=united-states&lang=en">Terms</a> • 
                <a href="#">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
    ).catch(err => console.log(err))


    await tempUser.deleteOne()
    return res.status(200).json({
      message: "User registered successfully"
    })
  }
  catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

async function sendLoginOtp(req, res) {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    await otpModel.deleteOne({ email })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = await bcrypt.hash(otp, 10)
    const tempToken = crypto.randomBytes(32).toString('hex')

    await otpModel.create({
      email,
      otp: hashedOtp,
      tempToken,
    })

    await sendEmail(
      email,
      "Login OTP",
      `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="format-detection" content="telephone=no"/>
  <title>Your Uber Code • ${otp}</title>
  <style type="text/css">
    :root {
      --bg: #f8fafc;
      --card: #ffffff;
      --text: #0f172a;
      --text-light: #475569;
      --accent: #000000;
      --accent-hover: #111111;
      --code-bg: #f1f5f9;
      --code-border: #cbd5e1;
      --warning: #dc2626;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f172a;
        --card: #1e293b;
        --text: #f1f5f9;
        --text-light: #94a3b8;
        --accent: #ffffff;
        --accent-hover: #e2e8f0;
        --code-bg: #334155;
        --code-border: #475569;
        --warning: #f87171;
      }
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .wrapper {
      max-width: 580px;
      margin: 40px auto;
      background: var(--card);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.12);
    }
    .header {
      background: linear-gradient(135deg, #000 0%, #1e293b 100%);
      color: white;
      padding: 56px 32px 44px;
      text-align: center;
    }
    .logo {
      font-size: 42px;
      font-weight: 900;
      letter-spacing: -2px;
      margin: 0;
    }
    .content {
      padding: 44px 36px;
      text-align: center;
    }
    .code-box {
      background: var(--code-bg);
      border: 3px solid var(--code-border);
      border-radius: 16px;
      padding: 32px 24px;
      margin: 32px 0 40px;
      font-family: 'SF Mono', 'Courier New', monospace;
      font-size: 56px;
      font-weight: 700;
      letter-spacing: 18px;
      color: var(--text);
      line-height: 1;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      margin: 0 0 16px;
    }
    .subtitle {
      font-size: 17px;
      line-height: 1.6;
      color: var(--text-light);
      margin: 0 0 28px;
    }
    .btn {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 16px 48px;
      border-radius: 12px;
      font-size: 17px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s;
    }
    .btn:hover {
      background: var(--accent-hover);
    }
    .security {
      font-size: 15px;
      color: var(--text-light);
      margin: 40px 0 0;
      line-height: 1.6;
    }
    .security strong {
      color: var(--warning);
    }
    .footer {
      background: rgba(0,0,0,0.03);
      padding: 32px 36px;
      font-size: 13px;
      color: var(--text-light);
      text-align: center;
      border-top: 1px solid rgba(0,0,0,0.08);
    }
    .footer a {
      color: var(--text);
      text-decoration: underline;
      font-weight: 500;
    }
    @media (max-width: 480px) {
      .wrapper { margin: 20px; border-radius: 16px; }
      .header { padding: 48px 24px 36px; }
      .content { padding: 36px 24px; }
      .code-box { font-size: 44px; letter-spacing: 12px; padding: 28px 16px; }
      .btn { padding: 14px 40px; font-size: 16px; }
    }
  </style>
</head>
<body>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:var(--bg); padding:20px 0;">
    <tr>
      <td align="center">

        <table class="wrapper" cellpadding="0" cellspacing="0" border="0">

          <!-- Header -->
          <tr>
            <td class="header">
              <!-- You can replace with real logo: -->
              <!-- <img src="https://your-domain.com/uber-logo-white.png" alt="Uber" style="max-width:160px; height:auto;" /> -->
              <h1 class="logo">Uber</h1>
              <p style="margin:10px 0 0; font-size:18px; opacity:0.9;">
                Login Verification
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content">

              <h2 class="title">Your code is ready</h2>

              <p class="subtitle">
                Enter this code to securely sign in to your Uber account.<br>
                It expires in <strong>10 minutes</strong>.
              </p>

              <div class="code-box">
                ${otp}
              </div>

              <a href="https://m.uber.com/ul/?action=setPickup" class="btn" target="_blank">
                Open Uber App
              </a>

              <p class="security">
                <strong>Important:</strong> Never share this code with anyone — including anyone claiming to be from Uber.<br>
                We will never call, text, or email asking for your verification code.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin:0 0 12px;">
                This is an automated security notification.<br>
                If you didn’t request this, please secure your account right away.
              </p>
              <p style="margin:20px 0 0;">
                <a href="https://help.uber.com">Help</a> • 
                <a href="https://www.uber.com/legal/en/document/?name=privacy-notice">Privacy</a> • 
                <a href="https://www.uber.com/legal/en/document/?name=general-terms-of-use">Terms</a>
              </p>
              <p style="margin:24px 0 0; font-size:12px; opacity:0.8;">
                © ${new Date().getFullYear()} Uber Technologies, Inc.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `

    )

    res.status(200).json({ message: "OTP sent successfully" })

  } catch (err) {
    res.status(500).json({
      message: err.message,
      tempToken
    })
  }
}

async function verifyLoginOtp(req, res) {
  try {
    const { tempToken, otp } = req.body

    if (!tempToken || !otp) {
      return res.status(400).json({ message: "OTP required" })
    }

    if (otp.length !== 6) {
      return res.status(400).json({ message: "Invalid OTP format" })
    }

    const otpDoc = await otpModel.findOne({ tempToken })

    if (!otpDoc) {
      return res.status(400).json({ message: "OTP expired or not found" })
    }

    const isMatch = await bcrypt.compare(otp, otpDoc.otp)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    await otpModel.deleteOne({ email })

    const token = jwt.sign(
      { userId: otpDoc.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token)

    res.status(200).json({ message: "Login successful" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token")
  res.status(200).json({ message: "User logged out successfully" })
}

module.exports = {
  sendEmailOtp,
  verifyEmailOtp,
  saveName,
  termsCondition,
  registerPassword,
  sendLoginOtp,
  verifyLoginOtp,
  logoutUser
}