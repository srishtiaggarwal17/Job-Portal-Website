import {createSlice} from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        filters: {
          experience: "",
          location: ""
        }
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setallAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload
        },
        setFilters: (state, action) => {
           state.filters = action.payload; // should be { experience: "", location: "" }
        }
    }
})
export const {setAllJobs,setSingleJob,setallAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery,setFilters} =jobSlice.actions;
export default jobSlice.reducer;




