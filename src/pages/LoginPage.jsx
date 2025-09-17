'use client';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { notify } from "../lib/Toaster";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../lib/axiosInstance";

export default function LoginPage() {
    const [step, setStep] = useState("mobile"); // "mobile" | "otp"
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false); // ✅ loading state

    const { fetchProfile } = useUserContext();
    const navigate = useNavigate();

    const validateMobile = (num) => /^[0-9]{10}$/.test(num);

    const handleSendOtp = async () => {
        if (!validateMobile(mobile)) {
            setError("Enter a valid 10-digit mobile number");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await axiosInstance.post("/auth/request-otp", {
                mobileNo: `+91${mobile}`,
                purpose: "LOGIN"
            });
            setStep("otp");
            setTimer(180);
            notify("Otp Sent To Your Mobile", "success");
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setError("Enter a valid 6-digit OTP");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/verify-otp", {
                mobileNo: `+91${mobile}`,
                otp
            });
            const data = res.data;

            if (data.success && data.data.accessToken) {
                Cookies.set("accessToken", data.data.accessToken, { expires: 7 });
                notify("Login successful!");
                await fetchProfile();
                navigate("/");
            } else {
                setError("Invalid OTP. Try again.");
            }
        } catch (err) {
            console.log("Verification failed. Try again.", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-cyan-100">
            <div className="w-full max-w-md mx-3 p-8 rounded-2xl shadow-2xl border border-green-200 bg-white/70 backdrop-blur-lg">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/1.png" alt="Finno Farms" className="w-16 h-16 mb-2 rounded-full shadow-md" />
                    <h2 className="text-3xl font-extrabold text-green-700 tracking-wide">Finno Farms</h2>
                    <p className="text-gray-500 text-sm">Freshness at your fingertips</p>
                </div>

                {/* Mobile Step */}
                {step === "mobile" && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                        <div className="flex items-center border border-green-400 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-400">
                            <div className="h-full px-3 py-2 bg-green-100 text-green-700 font-semibold">+91</div>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                placeholder="Enter 10-digit number"
                                className="w-full px-3 py-2 focus:outline-none bg-transparent"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className={`w-full mt-5 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md 
                                ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </div>
                )}

                {/* OTP Step */}
                {step === "otp" && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            maxLength={6}
                            placeholder="6-digit OTP"
                            className="w-full px-3 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className={`w-full mt-5 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md 
                                ${loading ? "bg-cyan-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700 text-white"}`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <div className="mt-4 text-center">
                            {timer > 0 ? (
                                <p className="text-gray-500 text-sm">
                                    Resend OTP in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                                </p>
                            ) : (
                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="text-green-600 font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p className="flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .667-.333 1-1 1s-1-.333-1-1 .333-1 1-1 1 .333 1 1z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
                        </svg>
                        Secure login powered by Finno Farms
                    </p>
                </div>
            </div>
        </div>
    );
}
