const rideModel = require('../models/rideForUser.model')
const userModel = require('../models/user.model')
const sendEmail = require('../utils/sendEmail')

async function createRide(req, res) {
    try {

        const riderId = req.user.id
        const { pickup, drop, vehicleType, rideType = "for_me", otherRider, scheduledTime, distance } = req.body

        const riderName = await userModel.findOne({ _id: riderId })

        if (!pickup || !drop) {
            return res.status(400).json({
                message: "Pickup and drop locations are required"
            })
        }

        if (!riderName) {
            return res.status(400).json({
                message: "Rider not found"
            })
        }

        if (!vehicleType) {
            return res.status(400).json({
                message: "Vehicle type is required"
            })
        }
        if (
            !pickup.location ||
            !drop.location ||
            !Array.isArray(pickup.location.coordinates) ||
            !Array.isArray(drop.location.coordinates)
        ) {
            return res.status(400).json({
                message: "Invalid location format"
            })
        }

        let finalScheduledTime = new Date()

        if (scheduledTime) {
            const parsedTime = new Date(scheduledTime)

            if (isNaN(parsedTime.getTime())) {
                return res.status(400).json({
                    message: "Invalid scheduled time"
                })
            }

            if (parsedTime < new Date()) {
                return res.status(400).json({
                    message: "Scheduled time cannot be in the past"
                })
            }

            finalScheduledTime = parsedTime
        }
        const estimatedFare = 100

        const existingActiveRide = await rideModel.findOne({
            rider: riderId,
            status: { $in: ["pending", "accepted", "started"] }
        })

        if (existingActiveRide) {
            return res.status(400).json({
                message: "You already have an active ride"
            })
        }

        const ride = await rideModel.create({
            rider: riderId,
            pickup,
            drop,
            distance,
            riderFirstName: riderName.firstName,
            riderLastName: riderName.lastName,
            driverFirstName: null,
            driverLastName: null,
            vehicleType,
            rideType,
            otherRider: rideType === "for_other" ? otherRider : null,
            scheduledTime: finalScheduledTime,
            fare: {
                estimated: estimatedFare,
                final: 0
            },
            status: "pending"
        })

        res.status(201).json({
            message: "Ride created successfully",
            ride
        })


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function acceptRide(req, res) {
    try {
        const driverId = req.user.id
        const { rideId } = req.params
        const driverName = await userModel.findOne({ _id: driverId })

        if (!driverName) {
            return res.status(400).json({
                message: "Driver not found"
            })
        }


        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can accept rides"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const ride = await rideModel.findOneAndUpdate(
            {
                _id: rideId,
                status: "pending",
                isRideActive: false,
                driverFirstName: null,
                driverLastName: null,
                otp:null
            },
            {
                $set: {
                    driver: driverId,
                    status: "accepted",
                    isRideActive: true,
                    driverFirstName: driverName.firstName,
                    driverLastName: driverName.lastName,
                    otp: otp
                }
            },
            { new: true }
        )

        if (!ride) {
            return res.status(400).json({
                message: "Ride already accepted or not available"
            })
        }

        res.status(200).json({
            message: "Ride accepted successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function startRide(req, res) {
    try {

        const driverId = req.user.id
        const { rideId } = req.params

        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can start rides"
            })
        }

        

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const ride = await rideModel.findOneAndUpdate(
            {
                _id: rideId,
                driver: driverId,   // only assigned driver
                status: "accepted"
            },
            {
                $set: {
                    status: "started",
                    startedAt: new Date(),
                    otp: otp
                }
            },
            { new: true }
        )

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be started"
            })
        }

        const rider = await userModel.findById(ride.rider)
        if (rider && rider.email) {
            await sendEmail(
                rider.email,
                "Your Ride OTP",
                `
               <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Ride OTP</title>
  <style type="text/css">
    /* Reset styles */
    body { margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    table, td, tr { border-collapse: collapse; vertical-align: top; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { color: #2563eb; text-decoration: none; }

    /* Main styles */
    .email-wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 20px 10px;
      font-family: -apple-system, BlinkMacOSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      padding: 32px 24px 28px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 32px 24px;
      text-align: center;
      color: #1f2937;
    }
    .otp-box {
      background-color: #f1f5f9;
      border-radius: 12px;
      padding: 20px;
      margin: 24px auto;
      font-size: 42px;
      font-weight: bold;
      letter-spacing: 12px;
      color: #1e40af;
      max-width: 280px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      font-size: 13px;
      color: #6b7280;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .btn {
      display: inline-block;
      background-color: #2563eb;
      color: white !important;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      margin: 16px 0;
      text-decoration: none !important;
    }

    /* Mobile */
    @media only screen and (max-width: 480px) {
      .otp-box {
        font-size: 36px;
        letter-spacing: 10px;
        padding: 16px;
      }
      .content {
        padding: 24px 18px;
      }
    }
  </style>
</head>
<body>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-wrapper">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="container">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <h1 style="margin:0; font-size:28px; font-weight:700;">Ride Confirmed!</h1>
              <p style="margin:8px 0 0; font-size:16px; opacity:0.95;">
                Your verification code
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content">

              <p style="font-size:16px; line-height:1.5; margin:0 0 20px;">
                Hi <strong>${ride.riderFirstName}</strong>,
              </p>

              <p style="font-size:16px; line-height:1.5; margin:0 0 8px;">
                Use this OTP to start your ride safely:
              </p>

              <div class="otp-box">
                ${otp}
              </div>

              <p style="font-size:15px; color:#4b5563; margin:24px 0 32px; line-height:1.5;">
                This code will expire in <strong>10 minutes</strong>.<br>
                Never share this code with anyone.
              </p>

              <a href="#" class="btn" style="color:white !important;">Open App</a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin:0 0 12px;">
                Ride • Uber • Lucknow
              </p>
              <p style="margin:0; font-size:13px;">
                If you didn't request this OTP, please ignore this email or contact support.
              </p>
              <p style="margin:16px 0 0; font-size:13px;">
                © 2025 Uber Technologies, Inc. All rights reserved.
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
            ).catch(err => console.log("Failed to send OTP email:", err))
        }

        res.status(200).json({
            message: "Ride started successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function completeRide(req, res) {
    try {

        const driverId = req.user.id
        const { rideId } = req.params

        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can complete rides"
            })
        }

        const ride = await rideModel.findOne({
            _id: rideId,
            driver: driverId,
            status: "started"
        })

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be completed"
            })
        }

        const finalFare = ride.fare.estimated

        ride.status = "completed"
        ride.completedAt = new Date()
        ride.fare.final = finalFare

        await ride.save()

        res.status(200).json({
            message: "Ride completed successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getPendingRides(req, res) {
    try {
        const rides = await rideModel.find({ status: "pending" })
        res.status(200).json({ message: "Pending Rides", rides })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getAcceptedRidesOfDriverInfo(req, res) {
    try {
        const driverId = req.user.id
        const ride = await rideModel.find({ driver: driverId })
        if (!ride || ride.length === 0) {
            return res.status(401).json({
                message: "No active rides found"
            })
        }
        res.status(200).json({
            message: "successfully finded the active rides",
            ride
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getAcceptedRidesOfRiderInfo(req, res) {
    try {
        const riderId = req.user.id
        const ride = await rideModel.find({ rider: riderId })
        if (!ride || ride.length === 0) {
            return res.status(401).json({
                message: "No active rides found for rider"
            })
        }
        res.status(200).json({
            message: "successfully found the active rides for rider",
            ride
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createRide,
    acceptRide,
    startRide,
    completeRide,
    getPendingRides,
    getAcceptedRidesOfDriverInfo,
    getAcceptedRidesOfRiderInfo
}
