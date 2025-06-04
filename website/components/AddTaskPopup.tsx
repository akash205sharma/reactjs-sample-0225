import React, { useState } from 'react';
import { Task, useLists } from '@/context/Lists';

interface AddTaskPopupProps {
    setShowAddTask: (show: boolean) => void;
    id: string;
}

const AddTaskPopup = ({ setShowAddTask, id }: AddTaskPopupProps) => {
    const { handleAddTask } = useLists();
    const [newTask, setNewTask] = useState<Task>({
        id: generateTaskId(),
        title: '',
        description: '',
        date: '',
        isComplete: false,
    });

    function generateTaskId() {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        return `task-${timestamp}-${randomSuffix}`;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-[#1c437c]">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative space-y-6 border border-[#1c437c]">
                <button
                    className="absolute top-3 right-4 text-2xl hover:text-red-600 transition"
                    onClick={() => setShowAddTask(false)}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-center">Create New Task</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTask(newTask, id);
                        setShowAddTask(false);
                        setNewTask({
                            id: generateTaskId(),
                            title: '',
                            description: '',
                            date: '',
                            isComplete: false,
                        });
                    }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full px-4 py-2 rounded-lg border border-[#1c437c] focus:outline-none focus:ring-2 focus:ring-[#1c437c]"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full px-4 py-2 rounded-lg border border-[#1c437c] focus:outline-none focus:ring-2 focus:ring-[#1c437c] resize-none"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-[#1c437c] focus:outline-none focus:ring-2 focus:ring-[#1c437c]"
                        value={newTask.date}
                        onChange={(e) => 
                            setNewTask({ ...newTask, date: e.target.value })
                        }
                    />
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            className="accent-[#1c437c]"
                            checked={newTask.isComplete}
                            onChange={(e) =>
                                setNewTask({ ...newTask, isComplete: e.target.checked })
                            }
                        />
                        <span>Mark as Complete</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#1c437c] hover:bg-[#16325e] text-white font-semibold rounded-lg transition duration-200"
                    >
                        Save Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPopup;
