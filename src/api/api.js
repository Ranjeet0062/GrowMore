const BASE_URL=import.meta.env.VITE_BASE_URL
export const authapi={
    login:`${BASE_URL}/user/api/v1/login`,
    signup:`${BASE_URL}/user/api/v1/signup`,
}