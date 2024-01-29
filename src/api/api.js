const BASE_URL=import.meta.env.VITE_BASE_URL
export const authapi={
    login:`${BASE_URL}/user/api/login`,
    signup:`${BASE_URL}/user/api/signup`,
    sendotp:`${BASE_URL}/user/api/sendotp`
}