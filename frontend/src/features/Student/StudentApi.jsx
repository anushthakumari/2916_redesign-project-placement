import { axiosInstance } from "../Staff/StaffApi"


export const getStudentDetailById=async(id)=>{
    try {
        const res=await axiosInstance.get(`http://localhost:8000/student/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateStudentById=async(update)=>{
    console.log(update)
    try {
        const res=await axiosInstance.patch(`http://localhost:8000/student/${update.id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}