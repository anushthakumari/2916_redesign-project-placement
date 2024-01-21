import { axiosInstance } from "../Staff/StaffApi"

export const createStudent=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/auth/signup/student",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const createStaff=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/auth/signup/staff",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const loginStaff=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/auth/login/staff",data,{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const loginStudent=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/auth/login/student",data,{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const checkAuth=async()=>{
    try {
        const res=await axiosInstance.get("http://localhost:8000/auth/checkauth",{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const logout=async()=>{
    try {
        const res=await axiosInstance.get('http://localhost:8000/auth/logout')
        return res.data
    } catch (error) {
        console.log(error)
    }
}