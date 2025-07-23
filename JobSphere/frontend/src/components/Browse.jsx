// import React, { useEffect } from "react";
// import Navbar from "./shared/Navbar";
// import Job from "./Job";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import useGetAllJobs from "@/hooks/useGetAllJobs";

// const Browse=()=>{
//     useGetAllJobs()
//     const {allJobs}=useSelector(store=>store.job)
//     const dispatch=useDispatch()
//     useEffect(()=>{
//         return ()=>{
//             dispatch(setSearchedQuery(""))
//         }
//     },[])
//     return(
//         <div>
//             <Navbar/>
//             <div className="max-w-7xl mx-auto my-10">
//                 <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>
//                 <div className="grid grid-cols-3 gap-4">
//                     {
//                     allJobs.map((job)=>{
//                         return(
//                             <Job key={job._id} job={job}/>
//                         )
//                     })
//                 }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Browse;




import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();

  const { allJobs, searchedQuery, filters } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filterJobs = () => {
      const [minExp, maxExp] = (filters.experience || "")
        .split("-")
        .map(Number);

      const jobs = allJobs.filter((job) => {
        const matchesQuery =
          searchedQuery === "" ||
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) 

        const matchesLocation =
          filters.location === "" ||
          job.location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesExperience =
          filters.experience === "" ||
          (job.experienceLevel >= minExp &&
            (isNaN(maxExp) ? job.experienceLevel >= minExp : job.experienceLevel <= maxExp));

        return matchesQuery && matchesLocation && matchesExperience;
      });

      setFilteredJobs(jobs);
    };

    filterJobs();
  }, [allJobs, searchedQuery, filters]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search Results ({filteredJobs.length})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;