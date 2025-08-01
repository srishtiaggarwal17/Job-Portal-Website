import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs=()=>{
    useGetAllAdminJobs()
    const [input,setInput]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setSearchJobByText(input))
    },[input])
    return(
        <div>
            <Navbar/>
            <div className=" max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input 
                       className="w-fit"
                       placeholder="Filter by Name, Role"
                       onChange={(e)=>setInput(e.target.value)}
                    />
                    <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable/>
            </div>
        </div>
    )
}

export default AdminJobs;