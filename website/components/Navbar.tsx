import React from 'react'

const Navbar = () => {
  // return (
  //   <div className='bg-[#1c437c] w-dvw h-[10vh] flex justify-between'>
  //     <img src="logo.png" height={250} width={250} alt="" />
  //     <img src="file.svg" width={200} height={200} alt="profile" />
  //   </div>
  // )

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
          src="/file.svg"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border border-white"
        />
      </div>
    </nav>
  );
};

export default Navbar;

