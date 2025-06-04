"use client"

import { useEffect, useState } from "react";
import AddTaskPopup from "./AddTaskPopup";
import { Task, useLists } from "@/context/Lists";
import EditTaskPopup from "./EditTaskPopup";

export default function TaskCard({
  title,
  tasks,
  id,
  setShowdeleteList,
  setDeleteListId,
}: {
  title: string;
  tasks: Task[];
  id: string;
  setShowdeleteList:any;
  setDeleteListId:any;
}) {
  const { toggleTaskCompleted } = useLists();
  const [completed, setCompleted] = useState(0);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    date: "",
    isComplete: false,
  });

  const getCompletedCount = (tasks: Task[]) => {
    if (tasks?.length) return tasks.filter((task) => task.isComplete).length;
    else return 0;
  };

  useEffect(() => {
    setCompleted(getCompletedCount(tasks));
  }, [tasks]);


  function formatDateWithOrdinal(date: Date): string {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        const getOrdinalSuffix = (n: number): string => {
            if (n > 3 && n < 21) return 'th';
            switch (n % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
    }

  return (
    <div className="w-80 rounded-xl bg-white shadow-lg border border-[#1c437c]/30 p-5 space-y-4 transition-all duration-200 hover:shadow-xl hover:border-[#1c437c]">
      {showAddTask && <AddTaskPopup id={id} setShowAddTask={setShowAddTask} />}
      {showEditTask && (
        <EditTaskPopup id={id} task={editingTask} setShowEditTask={setShowEditTask} />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#1c437c] wrap-anywhere ">{title}</h2>
        <button onClick={() => { setShowdeleteList(true); setDeleteListId(id) }} className="text-[#1c437c] text-2xl hover:text-[#16345f] transition">⋮</button>
      </div>

      {/* Task Section */}
      <div
        className="flex items-center gap-3 group cursor-pointer"
        onClick={() => setShowAddTask(true)}
      >
        <div className="bg-[#1c437c] group-hover:bg-[#16345f] text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition">
          +
        </div>
        <span className="text-[#1c437c] font-medium group-hover:underline">
          Add a task
        </span>
      </div>

      {/* Incomplete Tasks */}
      {tasks.map((task, i) =>
        !task.isComplete ? (
          <div
            key={i}
            className="p-3 bg-[#f1f6fd] rounded-lg hover:bg-[#e2efff] transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  onClick={() => toggleTaskCompleted(task.id, id)}
                  className="w-6 h-6 border-2 border-[#1c437c] rounded-full hover:bg-[#1c437c] hover:border-[#1c437c] transition cursor-pointer"
                ></div>
                <p className="text-[#1c437c] font-semibold">{task.title}</p>
                {task.date && <span>🔔</span>}
              </div>
              <span
                onClick={() => {
                  setEditingTask(task);
                  setShowEditTask(true);
                }}
                className="cursor-pointer hover:text-lg transition"
              >
                ✏️
              </span>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.date && (
              <div className="bg-blue-100 text-[#1c437c] text-xs px-2 py-1 w-fit rounded font-semibold">
                {formatDateWithOrdinal(new Date(task.date))}
              </div>
            )}
          </div>
        ) : null
      )}

      {/* Completed Title */}
      <div className="text-green-700 font-semibold mt-4">
        Completed ({completed})
      </div>

      {/* Completed Tasks */}
      {tasks.map((task, i) =>
        task.isComplete ? (
          <div
            key={i}
            className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
          >
            <div className="flex items-center gap-3 text-green-700">
              <div
                onClick={() => toggleTaskCompleted(task.id, id)}
                className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white transition"
              >
                ✓
              </div>
              <p className="font-medium">{task.title}</p>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
