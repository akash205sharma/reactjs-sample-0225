"use client";
import React, { useState } from "react";

const page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState<boolean>(false);

  return (
    <div className="text-[#1c437c] bg-[#1c437c] min-h-[90vh] flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#1c437c] mb-6">Sign up!</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full max-w-[350px] p-3 mb-4 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c437c]"
          required
        />

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

        <div className="w-full max-w-[350px] flex items-center mb-6 text-sm">
          <label className="flex items-center space-x-2 select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#1c437c]"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full max-w-[350px] bg-[#1c437c] text-white font-bold py-3 rounded-lg hover:bg-[#16325e] active:bg-[#145289] transition-colors"
          onClick={() => alert("Signing up...")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default page;
