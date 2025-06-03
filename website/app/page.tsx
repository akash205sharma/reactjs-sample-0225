"use client"
import Popup from '@/components/Popup'
import TaskCard from '@/components/TaskCard'
import { title } from 'process'
import React, { useEffect, useState } from 'react'
import { Task, TaskList } from '@/context/Lists'
import { useLists } from '@/context/Lists'


export default function Home() {
  const {lists, setLists} = useLists(); 

  const [showAddList, setShowAddList] = useState(false)
  const [addListTitle, setAddListTitle] = useState("")


  function generateTaskId() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `task-${timestamp}-${randomSuffix}`;
  }

  async function handleAddList() {
    setLists((prev) => [
      ...prev,
      {
        id: generateTaskId(),
        title: addListTitle,
        tasks: [],
      },
    ]);
    setAddListTitle("")
    setShowAddList(false)
  }


  return (
    <div className='min-h-[90vh] bg-white text-black'>
      <span
        onClick={() => { setShowAddList(true) }}
        className=" cursor-pointer fixed right-10 bottom-10 bg-[#1c437c] text-white text-5xl w-16 h-16 rounded-full flex items-center justify-center">+</span>
      <div className="p-3 flex gap-6 flex-wrap">
        {lists.length ? lists.map((list: any, index: any) => (
          <TaskCard key={index} title={list.title} tasks={list.tasks} id={list.id} />
        )) :
          <div className='text-[#1c437c] text-2xl' > No List Yet ! Create New List</div>
        }
      </div>

      {showAddList &&
        <div className="flex items-center justify-center fixed inset-0 bg-black/70 z-75">
          <div className="text-[#1c437c] text-xl bg-white p-6 rounded-lg shadow-xl min-w-[300px]">
            <button
              onClick={() => setShowAddList(false)}
              className="text-[#1c437c] float-right font-bold"
            > ✖ </button>
            <p>Add new List</p>
            <input className='border-[#1c437c] active:border-none  border rounded-sm p-2 my-2'
              type="text"
              placeholder='Enter list title'
              value={addListTitle}
              onChange={(e) => { setAddListTitle(e.target.value) }}
            />
            <button onClick={() => handleAddList()} className='ml-2 bg-[#1c437c] text-white rounded-sm p-2'>Add</button>
          </div>
        </div>
      }

    </div>
  )
}

