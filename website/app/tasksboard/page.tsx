"use client"
import Popup from '@/components/Popup'
import TaskCard from '@/components/TaskCard'
import React, { useState } from 'react'

const page = () => {

    const lists = [
        {
            title: "My tasks",
            tasks: [
                {
                    id: 1,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2020",
                    isComplete: false,
                },
                {
                    id: 2,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2021",
                    isComplete: false,
                },
                {
                    id: 3,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2021",
                    isComplete: true,
                },
                {
                    id: 4,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2021",
                    isComplete: true,
                },
                {
                    id: 5,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2021",
                    isComplete: true,
                },
            ]
        },
        {
            title: "My tasks",
            tasks: [
                {
                    id: 1,
                    title: "Task 1",
                    description: "ds",
                    date: "",
                    isComplete: false,
                },
                {
                    id: 2,
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd july 2023",
                    isComplete: true,
                },
            ]
        }
    ]

    const [showAddList, setShowAddList] = useState(true)


    return (
        <div className='min-h-[90vh] bg-white text-black'>
            <span
                onClick={() => { setShowAddList(true) }}
                className=" cursor-pointer fixed right-10 bottom-10 bg-[#1c437c] text-white text-5xl w-16 h-16 rounded-full flex items-center justify-center">+</span>
            <div className="p-3 flex gap-6 flex-wrap">
                {lists.map((list, index) => (
                    <TaskCard key={index} title={list.title} tasks={list.tasks} />
                ))}
            </div>
            <Popup></Popup>

            {showAddList &&
                <div className="flex items-center justify-center fixed inset-0 bg-black/70 z-75">
                    <div className="text-[#1c437c] text-xl bg-white p-6 rounded-lg shadow-xl min-w-[300px]">
                        <button
                            onClick={() => setShowAddList(false)}
                            className="text-[#1c437c] float-right font-bold"
                        > ✖</button>
                        <p>Add new List</p>
                        <input className='border-[#1c437c] active:border-none  border rounded-sm p-2 my-2' type="text" placeholder='Enter list title' />
                        <button className='ml-2 bg-[#1c437c] text-white rounded-sm p-2'>Add</button>
                    </div>

                </div>
            }

        </div>
    )
}

export default page
