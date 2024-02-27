const { default: mongoose } = require("mongoose");
const { instance } = require("../config/rozerpayIntance")
const Course = require("../model/course.mosel")
const User = require("../model/user.model")
const { enrolledinCourse } = require("../controller/Course")
const crypto = require("crypto");

exports.capturePayment = async (req, res) => {
    console.log("inside capturePayment", req.body)
    const courses = req.body;
    const userid = req.user.id;
    if (courses?.length === 0) {
        return res.json({
            success: false,
            message: "please provide course id "
        })
    }
    let totalAmount = 0
    for (const courseId of courses) {
        try {
            console.log("courseId", courseId)
            let course = await Course.findById(courseId);
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "could not find the course"
                })
            }
            console.log("courseeeeeeeeee", course)

            const uid = new mongoose.Types.ObjectId(userid);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "student is already enrolled"
                })
            }
            totalAmount += course.price
            console.log(totalAmount)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `something went wrong while calculting totalprice and erro is ${error}`
            })
        }

    }
    const currency = "INR"
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }
    try {
        console.log("totalfgfghghghgamont", totalAmount, typeof totalAmount);
        const paymentResponse = await instance.orders.create(options);
        // const paymentResponse = await instance.orders.create(options)
        return res.status(200).json({
            success: true,
            message: paymentResponse,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while initiating order and error is ${error}`
        })
    }
}
exports.verifyPayment = async (req, res) => {
    try {
        console.log("inside verifypayment", req.body)

        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body.courses
        const userid = req.user.id
        if (!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature || !courses || !userid) {
            return res.status(200).json({ success: false, message: "Payment Failed" });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");
        console.log("before if")
        if (expectedSignature === razorpay_signature) {
            console.log("inside if")

            enrolledinCourse(courses, userid, res);
            console.log("after enrolled")

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while verifying the payment`
        })
    }
}