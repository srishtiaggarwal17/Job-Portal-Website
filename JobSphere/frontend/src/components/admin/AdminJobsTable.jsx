import React, { useEffect, useState } from "react";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {Popover,PopoverContent,PopoverTrigger,} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job)
  const [filterJob,setFilterJob]=useState(allAdminJobs)
  const isEmpty = !Array.isArray(allAdminJobs) || allAdminJobs.length === 0;
  const navigate=useNavigate()

  useEffect(()=>{
    const filteredJob=allAdminJobs.length>=0&& allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true;
        }
        return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    })
    setFilterJob(filteredJob)
  },[allAdminJobs ,searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A List of your recent posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Job not found.
              </TableCell>
            </TableRow>
          ) : (
            filterJob.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white rounded-lg shadow-md p-2 space-y-2">
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}`)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
                        <Eye className="w-4 h-4"></Eye>
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;