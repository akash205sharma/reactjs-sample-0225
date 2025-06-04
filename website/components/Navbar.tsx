'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useLists } from '@/context/Lists'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
// import Image from 'next/image'

const Navbar = () => {
  const { user } = useLists() // make sure logout is defined in context
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  async function fetchImage() {
    const randomNumber = Math.floor(Math.random() * 1000)
    const res = await fetch(`https://picsum.photos/id/${randomNumber}/info`)
    const data = await res.json()
    return data?.download_url
  }

  useEffect(() => {
    fetchImage().then((url) => setProfileUrl(url))
  }, [])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-[#1c437c] w-full h-[10vh] px-4 md:px-10 flex items-center justify-between shadow-md text-white">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
      </div>

      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <div className="hidden md:flex flex-col items-end text-right mr-2">
          <p className="font-medium">{user?.displayName}</p>
          <p className="text-sm text-gray-200">{user?.email}</p>
        </div>

        <img
          src={profileUrl}
          alt="Profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-10 w-10 rounded-full object-cover border-2 border-white cursor-pointer"
        />

        {user && dropdownOpen && (
          <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md overflow-hidden w-40 z-50 text-black">
            <button
              onClick={() => {
                signOut(auth) 
                setDropdownOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
