import { axiosInstance } from "../Staff/StaffApi"

export const createAssignment=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/assignments",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchAssignmentByStudentId=async(id)=>{
    try {
        const res=await axiosInstance.get(`http://localhost:8000/assignments/student/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteAssingmentById=async(id)=>{
    try {
        const res=await axiosInstance.delete(`http://localhost:8000/assignments/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}