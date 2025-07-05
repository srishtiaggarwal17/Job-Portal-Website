// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";

// const HeroSection=()=>{
//     const [query,setQuery]=useState("")
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const searchJobHandler=()=>{
//         dispatch(setSearchedQuery(query))
//         navigate("/browse")
//     }

//     return(
//         <div className="text-center">
//             <div className="flex flex-col gap-5 my-10">
//                 <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">Your Career. Our Mission</span>
//                 {/* <h1 className="text-5xl font-bold">Search, Apply & <br/> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1> */}
//                 <h1 className="text-5xl font-bold">Your Dream Job <br/>Is Just a<span className="text-[#6A38C2]"> Search Away</span></h1>
//                 <p>Browse top roles, apply in seconds, and get closer to your dream career.</p>
//                 <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
//                     <input
//                     type="text"
//                     placeholder="Find your dream jobs"
//                     onChange={(e)=>setQuery(e.target.value)}
//                     className='outline-none border-none w-full'
//                     />
//                     <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
//                         <Search className="h-5 w-5"/>
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection;







import React, { useState } from "react";
import { Search, Briefcase, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery, setFilters } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    dispatch(setFilters({ experience, location }));
    navigate("/browse");
  };

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 w-full">
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full inline-block mb-4">
          <span className="text-orange-400 font-semibold text-sm">
            Your Career. Our Mission
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Your Dream Job <br />
          Is Just a <span className="text-purple-400">Search Away</span>
        </h1>

        <p className="text-white/80 text-base md:text-lg mb-8">
          Browse top roles, apply in seconds, and get closer to your dream career.
        </p>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col md:flex-row items-stretch gap-3 md:gap-4 shadow-lg">
          <div className="flex items-center gap-2 flex-grow border-b md:border-b-0 md:border-r border-white/30 pr-4">
            <Search className="text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title"
              className="w-full bg-transparent outline-none text-sm placeholder-white/60 text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:border-r border-white/30 pr-4">
            <Briefcase className="text-white w-5 h-5" />
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="appearance-none bg-white/10 backdrop-blur-md text-white text-sm px-3 py-2 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option className="bg-gray-800 text-white" value="">Your Experience</option>
              <option className="bg-gray-800 text-white" value="0-1">0-1 Years</option>
              <option className="bg-gray-800 text-white" value="1-3">1-3 Years</option>
              <option className="bg-gray-800 text-white" value="3-5">3-5 Years</option>
              <option className="bg-gray-800 text-white" value="5">5+ Years</option>
              </select>
          </div>

          <div className="flex items-center gap-2 flex-grow">
            <MapPin className="text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search area or city"
              className="w-full bg-transparent outline-none text-sm placeholder-white/60 text-white"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Button
            onClick={searchJobHandler}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 rounded-md transition"
          >
            Search jobs
          </Button>
        </div>

        <div className="mt-8">
          <CategoryCarousel />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
