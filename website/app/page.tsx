"use client"
import TaskCard from '@/components/TaskCard'
import React, { useEffect, useState } from 'react'
import { TaskList } from '@/context/Lists'
import { useLists } from '@/context/Lists'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { lists, setLists, user } = useLists();

  const [showAddList, setShowAddList] = useState(false)
  const [showdeleteList, setShowdeleteList] = useState(false)
  const [deleteListId, setDeleteListId] = useState("")
  const [addListTitle, setAddListTitle] = useState("")


  useEffect(() => {
    if (!user) router.push("/login");
  }, [user,router])



  function generateTaskId() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `list-${timestamp}-${randomSuffix}`;
  }

  function handleAddList() {
    const newList: TaskList = {
      id: generateTaskId(),
      title: addListTitle,
      tasks: [],
    }
    setLists((prev) => [
      ...prev,
      newList
    ]);
    setAddListTitle("")
    setShowAddList(false)
  }

  function handledeleteList(id: string) {
    setLists(prev => prev.filter((list: TaskList) => list.id !== id));
    setShowdeleteList(false)
  }


  return (
    <div className='min-h-[90vh] bg-white text-black'>
      <span
        onClick={() => { setShowAddList(true) }}
        className=" cursor-pointer fixed right-10 bottom-10 bg-[#1c437c] text-white text-5xl w-16 h-16 rounded-full flex items-center justify-center"
      >+</span>

      <div className="p-3 flex gap-6 flex-wrap">
        {lists.length ? lists.map((list: TaskList, index:React.Key) => (
          <TaskCard key={index} title={list.title} tasks={list.tasks} id={list.id} setShowdeleteList={setShowdeleteList} setDeleteListId={setDeleteListId} />
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

      {showdeleteList &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white text-[#1c437c] rounded-2xl p-6 shadow-2xl w-[90%] max-w-sm relative">
            <button
              onClick={() => setShowdeleteList(false)}
              className="absolute top-3 right-3 text-2xl font-bold text-[#1c437c] hover:text-red-500 transition"
              aria-label="Close"
            >
              ✖
            </button>
            <p className="text-lg font-semibold mb-4 text-center">Are you sure you want to delete this list?</p>

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => handledeleteList(deleteListId)}
                className="flex-1 bg-[#1c437c] hover:bg-[#16345e] text-white py-2 rounded-md transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowdeleteList(false)}
                className="flex-1 border border-[#1c437c] text-[#1c437c] py-2 rounded-md hover:bg-[#f0f4f8] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

