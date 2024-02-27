import axios from "axios";
import toast from "react-hot-toast";
import {resetCart} from "../../redux/slices/cart.slice"


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}
export const buyCourse = async (courses, userDetails, navigate, dispatch) => {
    try {
        console.log("inside buy course",courses)
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("RazorPay SDK failed to load")
            return;

        }
        const orderResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/capturePayment`,
            courses,
            { withCredentials: true }
        )
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("printing order response", orderResponse)
        const optation = {
            key: "rzp_test_t4LUM04KXw6wHc",
            order_id: orderResponse.data.message.id,
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            description: "Thank You for Purchasing the Course",
            name: "GrowMore",
            image: userDetails.image,
            prefill: {
                name: userDetails.firstname,
                email: userDetails.email
            },
            handler: function (response) {
                verifyPayment({ ...response, courses }, navigate, dispatch)
            }

        }
        const paymentObject = new window.Razorpay(optation)
        paymentObject.open();
        paymentObject.on("payment.failed", (response) => {
            toast.error("Opps,payment is failed")
            console.log("error accure in payment", response);
        })
    } catch (error) {
        console.log("something went to wrong while payment and errror is", error)
        toast.error("payment faile! try again")
    }

}
const verifyPayment = async (bodydata, navigate, dispatch)=>{
    const toastId = toast.loading("verifying payment...")

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verifyPayment`,
            bodydata,
            { withCredentials: true }
        )
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}