import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true, // Enable sending cookies with every request
});

export const getStaffDetailById=async(id)=>{
    try {
        const res=await axiosInstance.get(`http://localhost:8000/staff/${id}`,{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateStaffById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`http://localhost:8000/staff/${update.id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}