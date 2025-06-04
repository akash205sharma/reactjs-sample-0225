"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useLists } from '@/context/Lists'
import { loginUser } from "@/lib/auth";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState<boolean>(false);
  const [err, setErr] = useState("")
  const router = useRouter();
  const {user, setUser}=useLists();

  useEffect(() => {
    if(user) router.push("/");
  }, [user])

  async function handleSubmit() {
    try {
      const res= await loginUser(email,password)
      if(res.user){
        setUser(res.user)
        console.log("user logged in ")
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      setErr("User does not Exist")
      console.log("some problem occured",error)
    }
  }
  


  return (
    <div className="bg-[#1c437c] min-h-[90vh] flex justify-center items-center px-4 text-[#1c437c]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#1c437c] mb-6">Log in!</h1>
        {err.length?<p className="text-red-600" >{err}</p>:null}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-[350px] p-3 mb-4 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c437c]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-[350px] p-3 mb-4 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c437c]"
          required
        />

        <div className="w-full max-w-[350px] flex flex-col sm:flex-row justify-between items-center mb-6 text-sm">
          <label className="flex items-center space-x-2 select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#1c437c]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-[#1c437c] hover:underline focus:outline-none"
            onClick={() => alert("Password reset flow")}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full max-w-[350px] bg-[#1c437c] text-white font-bold py-3 rounded-lg hover:bg-[#16325e] active:bg-[#145289] transition-colors"
          onClick={handleSubmit}
        >
          Log in
        </button>
        <span className="text-black text-sm pt-2" >Don`t have an account <Link href={"/signup"} className=" cursor-pointer text-blue-500">signUp</Link> </span>
      </div>
    </div>
  );
};

export default Page;
