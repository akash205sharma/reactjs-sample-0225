import React from 'react'
import { Task } from '@/context/Lists';
interface AddTaskPopupProps {
    setShowAddTask: (show: boolean) => void;
    setNewTask: ({ }: Task) => void;
    newTask: Task;
    handleAddTask: (newTask: Task, listId: string) => void;
    id:string;
}

const AddTaskPopup = ({ newTask, setShowAddTask, setNewTask, handleAddTask, id }: AddTaskPopupProps) => {

    

    return (
        <div className="fixed inset-0 flex items-center justify-center text-[#1c437c] bg-black/70 z-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-3 text-xl text-[#1c437c]"
                    onClick={() => setShowAddTask(false)}
                >
                    ✖
                </button>

                <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(newTask);
                        handleAddTask(newTask,id);
                        setShowAddTask(false);
                        // optionally reset form
                        setNewTask({ id: newTask.id, title: "", description: "", date: "", isComplete: false });
                    }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border px-3 py-2 rounded"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full border px-3 py-2 rounded"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-full border px-3 py-2 rounded"
                        value={newTask.date}
                        onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={newTask.isComplete}
                            onChange={(e) => setNewTask({ ...newTask, isComplete: e.target.checked })}
                        />
                        <span>Mark as Complete</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-[#1c437c] text-white py-2 rounded"
                    >
                        Save Task
                    </button>
                </form>
            </div>
        </div>

    )
}

export default AddTaskPopup
