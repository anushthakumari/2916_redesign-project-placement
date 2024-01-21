import { axiosInstance } from "../Staff/StaffApi"


export const fetchAllProjects=async()=>{
    try {
        const res=await axiosInstance.get("http://localhost:8000/projects")
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchProjectById=async(id)=>{
    try {
        const res=await axiosInstance.get(`http://localhost:8000/projects/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchProjectByProffessorId=async(id)=>{
    try {
        const res=await axiosInstance.get(`http://localhost:8000/projects/professor/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addProject=async(data)=>{
    try {
        const res=await axiosInstance.post("http://localhost:8000/projects",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const updateProjectById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`http://localhost:8000/projects/${update.id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteProjectById=async(id)=>{
    try {
        const res=await axiosInstance.delete(`http://localhost:8000/projects/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}