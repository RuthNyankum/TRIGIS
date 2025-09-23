import React, { useState } from "react";
import loginIcons from "../assets/images/trigis.jpg";
import { toast } from "react-toastify";
import api from "../config/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Reset link sent! 📧");
      setEmail(""); // clear input
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <section id="forgotPassword">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icon" />
          </div>

          <form className="t-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="email">Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
