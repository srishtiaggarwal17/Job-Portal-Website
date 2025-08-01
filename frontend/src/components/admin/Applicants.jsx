import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants=()=>{
    const params=useParams()
    const dispatch=useDispatch()
    const {applicants}=useSelector(store=>store.application)
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchAllApplicants=async()=>{
            try{
                const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
                dispatch(setAllApplicants(res.data.job))
                // if(res.data.success){
                //     dispatch(setAllApplicants(res.data.job))
                //     toast.success(res.data.message)
                // }
            }catch(error){
                console.log(error)
            }
        }
        fetchAllApplicants()
    },[])
    return(
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">Applicants {applicants?.applications?.length || 0}</h1>
                <ApplicantsTable/>
            </div>
        </div>
    )
}

export default Applicants
