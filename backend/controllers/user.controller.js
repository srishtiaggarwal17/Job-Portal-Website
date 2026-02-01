import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
//import sendEmail from "../utils/nodemailer.js";

export const register=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber ||!password ||!role){
            return res.status(400).json({
                message:"Something is missing.",
                success:false
            });
        };
        const file=req.file
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
        const user=await User.findOne({email}); //checks whether the user already exists or not
        if(user){
            return res.status(400).json({
                message:'User already exist with this email.',
                success:false,
            })
        }
        const hashedPassword=await bcrypt.hash(password,10) //kitni length ka passowrd hona chahiye

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        });
    }
    catch(error){
        console.log(error)
    }
}

// export const register=async(req,res)=>{
//     try{
//         const {fullname,email,phoneNumber,password,role}=req.body;
//         if(!fullname || !email || !phoneNumber ||!password ||!role){
//             return res.status(400).json({
//                 message:"Something is missing.",
//                 success:false
//             });
//         };
       
//         let profilePhotoUrl = "";

//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const cloudResponse = await cloudinary.uploader.upload(
//         fileUri.content
//       );
//       profilePhotoUrl = cloudResponse.secure_url;
//     }
//         // const file=req.file
//         // const fileUri=getDataUri(file);
//         // const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
//         const user=await User.findOne({email}); //checks whether the user already exists or not
//         if(user){
//             return res.status(400).json({
//                 message:'User already exist with this email.',
//                 success:false,
//             })
//         }

//         const hashedPassword=await bcrypt.hash(password,10) //kitni length ka passowrd hona chahiye
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); 

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password:hashedPassword,
//             role,
//             isVerified: false,
//             emailOtp: otp,
//             otpExpiry,
//             profile:{
//                 profilePhoto:profilePhotoUrl,
//             },
//         });
        
//         try {
//             await sendEmail({
//                 to: email,
//                 subject: "Verify your email - OTP",
//                 body: `
//                    <h3>Hello ${fullname},</h3>
//                    <p>Your email verification OTP is:</p>
//                    <h2>${otp}</h2>
//                    <p>This OTP is valid for 1 minute.</p>
//                 `,
//             });
//         } catch (emailError) {
//             console.error("Email failed:", emailError.message);
//         }

//          return res.status(201).json({
//              message:"OTP sent to your email. Please verify.",
//              success:true
//          });
//      }
//     catch(error){
//         console.log(error)
//         return res.status(500).json({
//            message: "Registration failed",
//            success: false
//         });
//     }
// }

// export const verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//         return res.status(400).json({ message: "OTP required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//        return res.status(404).json({ message: "User not found" });
//     }
//     if (user.isVerified) {
//         return res.json({ message: "Email already verified" });
//     }
//     if (user.emailOtp !== otp) {
//         return res.status(400).json({ message: "Invalid OTP" });
//     }
//     if (user.otpExpiry < Date.now()) {
//         return res.status(400).json({ message: "OTP expired" });
//     }
//     user.isVerified = true;
//     user.emailOtp = null;
//     user.otpExpiry = null;
//     user.otpResendCount = 0;
//     user.otpResendBlockedUntil = null;
//     await user.save();
//     res.json({ message: "Email verified successfully" });
// };

// export const resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "Email already verified" });
//     }

//     const now = new Date();

//     //  CHECK IF USER IS TEMPORARILY BLOCKED
//     if (
//       user.otpResendBlockedUntil &&
//       user.otpResendBlockedUntil > now
//     ) {
//       const secondsLeft = Math.ceil(
//         (user.otpResendBlockedUntil - now) / 1000
//       );

//       return res.status(429).json({
//         message: `Too many attempts. Try again in ${secondsLeft}s`
//       });
//     }

//     //  RESET COUNTER AFTER BLOCK PERIOD
//     if (
//       user.otpResendBlockedUntil &&
//       user.otpResendBlockedUntil <= now
//     ) {
//       user.otpResendCount = 0;
//       user.otpResendBlockedUntil = null;
//     }

//     //  CHECK ATTEMPT LIMIT
//     if (user.otpResendCount >= 3) {
//       user.otpResendBlockedUntil = new Date(
//         now.getTime() + 5 * 60 * 1000 // 5 minutes
//       );
//       await user.save();

//       return res.status(429).json({
//         message: "Too many OTP requests. Try again after 5 minutes."
//       });
//     }

//     // 🔹 GENERATE OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);

//     user.emailOtp = otp;
//     user.otpExpiry = otpExpiry;
//     user.otpResendCount += 1;

//     await user.save();

//     await sendEmail({
//       to: email,
//       subject: "Your OTP",
//       body: `
//         <h3>Email Verification</h3>
//         <p>Your OTP is:</p>
//         <h2>${otp}</h2>
//         <p>This OTP is valid for 1 minute.</p>
//       `
//     });

//     return res.json({
//       message: `OTP sent (${user.otpResendCount}/3)`
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Failed to resend OTP"
//     });
//   }
// };


export const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        // let user=await user.findOne({email});
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or Password",
                success:false
            })
        }
        // if (!user.isVerified) {
        //     return res.status(403).json({
        //         message: "Please verify your email before logging in",
        //         isVerified: false,
        //         email: user.email
        //     });
        // }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or Password",
                success:false
            })
        };
        //check role is correct or not
        if(role!=user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role.",
                success:false
            })
        };
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true,secure: true,sameSite:'None'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }
    catch(error){
        console.log(error)
    }
}


// export const logout=async(req,res)=>{
//     try{
//         return res.status(200).cookie("token","",{maxAge:0}).json({
//             message:"Logged out successfuly",
//             status:true
//         })
//     }
//     catch(error){
//         console.log(error)
//     }
// }
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",       // or "none" if using cross-origin with credentials
                secure: false          // true in production (HTTPS)
            })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};



export const updateProfile=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content,{resource_type: "auto"});   
        let skillsArray;
        if(skills)
        skillsArray=skills.split(",");
        const userId=req.id; //middleware authentication
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"user not Found.",
                success:false
            })
        }
        //updating data
        if(fullname) user.fullname=fullname
        if (email)user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url
            user.profile.resumeOriginalName=file.originalname
        }
        await user.save();
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        });
    }
    catch(error){
        console.log(error)
    }
}


// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;

//     const userId = req.id; // from middleware
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     // Parse skills
//     let skillsArray;
//     if (skills) skillsArray = skills.split(",");

//     // Update basic fields
//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     // ✅ Handle file upload only if file is provided
//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "raw",
//       });

//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = req.file.originalname;
//     }

//     await user.save();

//     const safeUser = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user: safeUser,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error while updating profile",
//       success: false,
//     });
//   }
// };







