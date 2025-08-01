import { setallAdminJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllAdminJobs=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try{
                const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setallAdminJobs(res.data.jobs))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchAllJobs()
    },[])
}
export default useGetAllAdminJobs
