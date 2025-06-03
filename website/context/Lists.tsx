'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

export type Task = {
    id: string;
    title: string;
    description: string;
    date: string;
    isComplete: boolean;
};

export type TaskList = {
    id: string;
    title: string;
    tasks: Task[];
};

interface ListsContextType {
    lists: TaskList[];
    setLists: Dispatch<SetStateAction<TaskList[]>>;
    handleAddTask: (newTask: Task, listId: string) => {}
    handleEditTask: (newTask: Task, listId: string) => {}
    toggleTaskCompleted: (taskId: string, listId: string) => {}
}

const Lists = createContext<ListsContextType | null>(null);

export const ListsProvider = ({ children }: { children: ReactNode }) => {
    const [lists, setLists] = useState<TaskList[]>([])

    // const { data: session } = useSession();
    async function handleAddTask(newTask: Task, listId: string) {
        setLists(prevLists =>
            prevLists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask]
                    };
                }
                return list;
            })
        );
    }

    async function handleEditTask(newTask: Task, listId: string) {
        setLists(prevLists =>
            prevLists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasks: list.tasks.map(task =>
                            task.id === newTask.id ? { ...task, ...newTask } : task
                        )
                    };
                }
                return list;
            })
        );
    }

    async function toggleTaskCompleted(taskId: string, listId: string) {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId
                    ? {
                        ...list,
                        tasks: list.tasks.map(task =>
                            task.id === taskId
                                ? { ...task, isComplete: !task.isComplete }
                                : task
                        ),
                    }
                    : list
            )
        );
    }




    const listsdemo: TaskList[] = [
        {
            id: "1",
            title: "My tasks",
            tasks: [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2020",
                    isComplete: false,
                },
                {
                    id: "2",
                    title: "Task 1",
                    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                    date: "3rd July, 2021",
                    isComplete: false,
                },
                // {
                //     id: "3",
                //     title: "Task 1",
                //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                //     date: "3rd July, 2021",
                //     isComplete: true,
                // },
                // {
                //     id: "4",
                //     title: "Task 1",
                //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                //     date: "3rd July, 2021",
                //     isComplete: true,
                // },
                // {
                //     id: "5",
                //     title: "Task 1",
                //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                //     date: "3rd July, 2021",
                //     isComplete: true,
                // },
            ]
        },
        {
            id: "2",
            title: "My tasks",
            tasks: [
                // {
                //     id: "1",
                //     title: "Task 1",
                //     description: "ds",
                //     date: "",
                //     isComplete: false,
                // },
                // {
                //     id: "2",
                //     title: "Task 1",
                //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, tempora! ",
                //     date: "3rd july 2023",
                //     isComplete: true,
                // },
            ]
        }
    ]

    useEffect(() => {
        setLists(listsdemo);
    }, [])

    return (
        <Lists.Provider value={{ lists, setLists, handleAddTask, handleEditTask, toggleTaskCompleted }}>
            {children}
        </Lists.Provider>
    );
};

export const useLists = () => {
    const context = useContext(Lists);
    if (!context) {
        throw new Error('useLists must be used within a ListsProvider');
    }
    return context;
};
