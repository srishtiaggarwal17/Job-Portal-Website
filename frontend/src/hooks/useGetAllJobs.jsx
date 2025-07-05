import { setAllJobs } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllJobs=()=>{
    const dispatch=useDispatch()
    const {searchedQuery}=useSelector(store=>store.job)
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try{
                const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchAllJobs()
    },[searchedQuery])
}

export default useGetAllJobs


// import { setAllJobs } from "@/redux/jobSlice";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const { searchedQuery, filters } = useSelector((store) => store.job);

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const params = new URLSearchParams();

//         if (searchedQuery) params.append("keyword", searchedQuery);
//         if (filters.experience) params.append("experience", filters.experience);
//         if (filters.location) params.append("location", filters.location);

//         const res = await axios.get(`${JOB_API_END_POINT}/get?${params.toString()}`, {
//           withCredentials: true
//         });

//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchAllJobs();
//   }, [searchedQuery, filters]); // Run this whenever filters or query changes
// };

// export default useGetAllJobs;

