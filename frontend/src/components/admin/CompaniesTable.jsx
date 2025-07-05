
//         <div>
//             <Table>
//                 <TableCaption>A List of your recent registered companies.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody >
//                     {
//                         companies.length<=0?<span>Company not Found.</span>:(
//                             <>
//                                 {
//                                 companies?.map((company)=>{
//                                     return(
//                                     <div key={company._id}>
//                                         <TableCell className="h-10 w-10 rounded-full overflow-hidden p-0">
//                                             <Avatar className="h-12 w-12 rounded-full overflow-hidden border">
//                                                <AvatarImage className="h-full w-full object-cover" src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="Company Logo"></AvatarImage>
//                                             </Avatar>
//                                         </TableCell>
//                                         <TableCell>{company.name}</TableCell>
//                                         <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//                                         <TableCell className="text-right cursor-pointer">
//                                             <Popover>
//                                                 <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
//                                                 <PopoverContent className="w-32">
//                                                     <div className="flex items-center gap-2 w-fit cursor-pointer">
//                                                         <Edit2 className="w-4"/>
//                                                         <span>Edit</span>
//                                                     </div>
//                                                 </PopoverContent>
//                                             </Popover>
//                                         </TableCell>
//                                     </div>
                                        
//                                     )
//                                 })
//                             }
//                             </>
//                         )
//                     }
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }



import React, { useEffect, useState } from "react";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {Popover,PopoverContent,PopoverTrigger,} from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies ,searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany,setFilterCompany]=useState(companies)
  const isEmpty = !Array.isArray(companies) || companies.length === 0;
  const navigate=useNavigate()

  useEffect(()=>{
    const filteredCompany=companies.length>=0&& companies.filter((company)=>{
        if(!searchCompanyByText){
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[companies ,searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A List of your recent registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Company not found.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell className="h-10 w-10 rounded-full overflow-hidden p-0">
                  <Avatar className="h-12 w-12 rounded-full overflow-hidden border">
                    <AvatarImage
                    //   className="h-full w-full object-cover"
                      className="h-full w-full object-contain p-1"
                      src={
                        company.logo 
                      }
                      alt="Company Logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;


