"use client"
import React, { useState } from 'react'

const page = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState<boolean>(false)



    return (
        <div className='bg-[#1c437c] w-dvw h-dvh justify-center flex'>
            <div className='flex flex-col justify-center items-center' >
                <div className='text-3xl'> Sign up!</div>
                <div>
                    <input className='border w-[min(350px,80vw)] p-3 m-2 mx-0' type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div>
                    <input className='border w-[min(350px,80vw)] p-3 m-2 mx-0' type="text" placeholder='Email address' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <input className='border w-[min(350px,80vw)] p-3 m-2 mx-0' type="text" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="flex flex-col sm:flex-row justify-start w-full gap-2 sm:gap-0">
                    <div>
                        <input
                            type="checkbox"
                            width={30}
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />{" "}
                        Remember me
                    </div>
                    
                </div>
                <div className='border bg-white text-[#1c437c] w-full p-2 my-2 text-center font-bold hover:bg-gray-300 active:bg-white' >Sign up</div>
            </div>
        </div>
    )
}

export default page
