"use client"

import { useEffect, useState } from "react";

// components/TaskCard.tsx
export type Task = {
    id:number;
    title: string;
    description: string;
    date: string;
    isComplete: boolean;
};

export default function TaskCard({
    title,
    tasks,
}: {
    title: string;
    tasks: Task[];
}) {


    const getCompletedCount = (tasks: Task[]) => {
        return tasks.filter(task => task.isComplete).length;
    };

    useEffect(() => {
        setCompleted(getCompletedCount(tasks))
    }, [tasks])

    const [completed, setCompleted] = useState(0)



    return (
        <div className="border border-[#1c437c] w-80 rounded p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1c437c]">{title}</h2>
                <button>⋮</button>
            </div>

            <div className="flex items-center gap-3">
                <span className="bg-[#1c437c] text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center">
                    +
                </span>
                <span className="text-[#1c437c] font-medium">Add a task</span>
            </div>

            {tasks.map((task, i) => (
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
