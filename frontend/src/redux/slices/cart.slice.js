import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? localStorage.getItem("cart") : [],
    total: localStorage.getItem("total") ? localStorage.getItem("total") : 0,
    totalItem: localStorage.getItem("totalItem") ? localStorage.getItem("totalItem") : 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)
            if (index >=0) {
                // If the course is already in the cart, do not modify the quantity
                toast.error("Course already in cart")
                return
            }
            state.cart.push(course);
            state.total += course.price,
                state.totalItem++;
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItem))
            toast.success("Course added to cart")
        },
        removeCart:(state,action)=>{
            const index=state.cart.findIndex((item)=>item._id==action.payload);
            if(index>=0){
                return state.cart.filter((item)=>item._id!==action.payload);
                toast.success("Course removed from cart")
            }else{

                toast.error("Course is not in cart")
            }
        },
        resetCart:(state)=>{
            state.cart=[],
            state.total=0;
            state.totalItem=0;
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItem")
        }
    }
})
export const{addTocart,removeCart,resetCart}=cartSlice.actions
export default cartSlice.reducer