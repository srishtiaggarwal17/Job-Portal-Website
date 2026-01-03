import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [resendTimer, setResendTimer] = useState(60);      
  const [resending, setResending] = useState(false);       

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // ✅ SAFETY: redirect if page opened directly or refreshed
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // ✅ ADDED: Resend OTP countdown timer
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste (paste full OTP)
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = newOtp[i];
      }
    });

    inputsRef.current[OTP_LENGTH - 1].focus();
  };

  // ✅ VERIFY OTP
  const submitHandler = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== OTP_LENGTH) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/verifyOtp`,
        { email, otp: finalOtp },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  // ✅ ADDED: RESEND OTP HANDLER
  const resendOtpHandler = async () => {
    try {
      setResending(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/resendOtp`,
        { email },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Reset OTP boxes
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();

      // Restart timer
      setResendTimer(30);

    } catch (err) {    
      if (err.response?.status === 429) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to resend OTP");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to <br />
          <span className="font-medium">{email}</span>
        </p>

        <div
          className="flex justify-center gap-3 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              className="w-12 h-12 border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button
          onClick={submitHandler}
          disabled={otp.join("").length !== OTP_LENGTH}
          className={`w-full py-2 rounded-md text-white font-medium transition ${
            otp.join("").length === OTP_LENGTH
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Verify OTP
        </button>

        {/* ✅ ADDED: RESEND OTP UI */}
        <div className="text-center mt-4">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {resendTimer}s
            </p>
          ) : (
            <button
              onClick={resendOtpHandler}
              disabled={resending}
              className="text-purple-600 text-sm font-medium hover:underline"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
