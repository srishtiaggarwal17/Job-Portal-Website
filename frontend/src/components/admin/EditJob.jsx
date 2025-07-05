// import React, { useEffect, useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Button } from "../ui/button";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../ui/input";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import useGetJobById from "@/hooks/useGetJobById";
// import { Select,SelectLabel, SelectValue ,SelectTrigger, SelectContent, SelectGroup, SelectItem} from "../ui/select";

// const EditJob = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { singleJob } = useSelector((store) => store.job);

//   // Fetch job details
//   useGetJobById(id);

//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experienceLevel: "",
//     position: 0,
//     companyId: "",
//   });

//   const [loading, setLoading] = useState(false);

//   //
//   const {companies}=useSelector(store=>store.company)
//   const selectChangeHandler=(value)=>{
//         const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value)
//         setInput({...input,companyId:selectedCompany._id})
//     }

//   // Prefill data when singleJob is loaded
//   useEffect(() => {
//     if (singleJob) {
//       setInput({
//         title: singleJob.title || "",
//         description: singleJob.description || "",
//         requirements: singleJob.requirements || "",
//         salary: singleJob.salary || "",
//         location: singleJob.location || "",
//         jobType: singleJob.jobType || "",
//         experienceLevel: singleJob.experienceLevel || "",
//         position: singleJob.position || 0,
//         companyId: singleJob.company?._id || "", // in case company is populated
//       });
//     }
//   }, [singleJob]);

//   // Handle input change
//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: name === "position" ? parseInt(value) : value,
//     }));
//   };

//   // Submit update
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const body = { ...input };

//     try {
//       setLoading(true);
//       const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, body, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/jobs");
//       }
//     } catch (error) {
//       console.error("Error updating job:", error);
//       toast.error(error?.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto my-10">
//         <form onSubmit={submitHandler}>
//           <div className="flex items-center gap-5 p-8">
//             <Button
//               onClick={() => navigate("/admin/jobs")}
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//               variant="outline"
//               type="button"
//             >
//               <ArrowLeft />
//               <span>Back</span>
//             </Button>
//             <h1 className="font-bold text-xl">Edit Job</h1>
//           </div>

//           <div className="grid grid-cols-2 gap-4 px-8">
//             <div>
//               <Label>Job Title</Label>
//               <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Requirements</Label>
//               <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Salary</Label>
//               <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Job Type</Label>
//               <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Experience</Label>
//               <Input type="text" name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler} />
//             </div>
//             <div>
//               <Label>Position</Label>
//               <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
//             </div>
//             <div>
//                         {
//                             companies.length>0 && (
//                                 <Select onValueChange={selectChangeHandler} 
//                                 value={
//     companies.find((c) => c._id === input.companyId)?.name?.toLowerCase() || ""
//   }
//                                 >
//                                     <SelectTrigger className="w-[180px]">
//                                         <SelectValue placeholder="Select Company" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             {
//                                                 companies.map((company)=>{
//                                                     return(
//                                                         <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
//                                                     )
//                                                 })
//                                             }
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             )
//                         }
//                     </div>
//           </div>

//           <div className="px-8">
//             {loading ? (
//               <Button className="w-full my-6" disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Updating...
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-6">
//                 Update
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditJob;









import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";
import {
  Select,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  useGetJobById(id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  // Prefill form when job loads
  useEffect(() => {
    if (singleJob &&companies.length>0) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experienceLevel: singleJob.experienceLevel || "",
        position: singleJob.position || 0,
        companyId: singleJob.company?._id || "",
      });
    }
  }, [singleJob,companies]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: name === "position" ? parseInt(value) : value,
    }));
  };

  const selectChangeHandler = (companyId) => {
    setInput((prev) => ({ ...prev, companyId }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = { ...input };

    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/jobs")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
              variant="outline"
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 px-8">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              {companies.length > 0 && (
                <>
                  <Label>Company</Label>
                  <Select
                    onValueChange={selectChangeHandler}
                    value={input.companyId}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company._id}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>

          <div className="px-8">
            {loading ? (
              <Button className="w-full my-6" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-6">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
