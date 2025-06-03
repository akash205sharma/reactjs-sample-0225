"use client"

import { useEffect, useState } from "react";
import AddTaskPopup from "./AddTaskPopup";
import { Task } from "@/context/Lists";

export default function TaskCard({
    title,
    tasks,
    handleAddTask,
    id,
}: {
    title: string;
    tasks: Task[];
    id:string;
    handleAddTask:(newTask:Task,listId:string)=>void;
}) {

    function generateTaskId() {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        return `task-${timestamp}-${randomSuffix}`;
    }

    const [completed, setCompleted] = useState(0)
    const [showAddTask, setShowAddTask] = useState(false)
    // const [tasksState, setTasksState] = useState<Task[]>()
    const [newTask, setNewTask] = useState({
        id:generateTaskId(),
        title: "",
        description: "",
        date: "",
        isComplete: false,
    });

    const getCompletedCount = (tasks: Task[]) => {
        if (tasks?.length)
            return tasks.filter(task => task.isComplete).length;
        else return 0;
    };

    useEffect(() => {
        setCompleted(getCompletedCount(tasks))
    }, [tasks])


    return (
        <div className="border border-[#1c437c] w-80 rounded p-4 space-y-4">
            {showAddTask &&
                <AddTaskPopup id={id} newTask={newTask} setShowAddTask={setShowAddTask} setNewTask={setNewTask} handleAddTask={handleAddTask}  />
            }

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1c437c]">{title}</h2>
                <button>⋮</button>
            </div>
            {tasks?.length ?
                <div className="flex items-center gap-3">
                    <span onClick={() => { setShowAddTask(true) }} className="cursor-pointer bg-[#1c437c] text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center">
                        +
                    </span>
                    <span className="text-[#1c437c] font-medium">Add a task</span>
                </div>
                :
                <div className="flex items-center gap-3 justify-between">
                    <span className="text-[#1c437c] font-medium">New task</span>
                    <span onClick={() => { setShowAddTask(true) }} className="cursor-pointer bg-[#1c437c] text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center">
                        +
                    </span>
                </div>
            }
            {tasks?.map((task, i) => (
                <div key={i} className="space-y-2">
                    {!task.isComplete &&
                        <>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 border rounded-full hover:border-green-600"></div>
                                    <p className="font-semibold text-[#1c437c]">{task.title}</p>
                                    {task.date.length > 0 &&
                                        <span role="img" aria-label="lock">
                                            🔔
                                        </span>
                                    }
                                </div>
                                <span className="cursor-pointer hover:text-32xl " onClick={() => { alert("Edit") }} role="img" aria-label="lock" >
                                    ✏️
                                </span>

                            </div>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            {task.date.length > 0 &&
                                <div className="bg-blue-100 px-3 py-1 w-fit rounded text-sm font-bold text-[#1c437c]">
                                    task.date
                                </div>
                            }
                        </>
                    }
                </div>
            ))}
            <div className="text-green-600">Completed({completed})</div>
            {tasks.map((task, i) => (
                <div key={i} className="space-y-2">
                    {task.isComplete &&
                        <>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-green-600">
                                    <div className=" border-green-600  w-8 h-8 border rounded-full flex justify-center items-center "> ✓ </div>
                                    <p className="font-semibold ">{task.title}</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            ))}
        </div>
    );
}
