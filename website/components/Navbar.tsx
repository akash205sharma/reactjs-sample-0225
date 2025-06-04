'use client'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined);

  async function fetchImage() {
    let randomNumber = Math.floor(Math.random()* 1000);
    var res= await fetch(`https://picsum.photos/id/${randomNumber}/info`);
    let data = await res.json();
    let url = data?.download_url;
    return url;
  }

  useEffect(() => {
    fetchImage().then(url => setProfileUrl(url));
  }, []);

  return (
    <nav className="bg-[#1c437c] w-full h-[10vh] px-4 md:px-10 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="flex items-center">
        <img
          // src="https://picsum.photos/id/77/info"
          src={profileUrl}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border border-white"
        />
      </div>
    </nav>
  );
};

export default Navbar;

