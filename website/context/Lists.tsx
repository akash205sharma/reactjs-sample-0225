'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import {
    getLists,
    updateAllLists,
} from '@/lib/firebaseTasks'


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
    handleAddTask: (newTask: Task, listId: string) => void
    handleEditTask: (newTask: Task, listId: string) => void
    toggleTaskCompleted: (taskId: string, listId: string) => void
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

const Lists = createContext<ListsContextType | null>(null);

export const ListsProvider = ({ children }: { children: ReactNode }) => {
    const [lists, setLists] = useState<TaskList[]>([])
    const [user, setUser] = useState<User | null>(null)

    // Load user session on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)
            } else {
                setUser(null)
                setLists([])
            }
        })

        return () => unsubscribe()
    }, [])

    // load lists 
    useEffect(() => {
        if (user) {
            getLists(user.uid).then(setLists).catch(console.error)
        }
    }, [user])


    useEffect(() => {
        const syncToFirestore = async () => {
            if (user) {
                await updateAllLists(user.uid, lists);
            }
        };
        syncToFirestore();
    }, [lists]);




    // const { data: session } = useSession();
    function handleAddTask(newTask: Task, listId: string) {
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

    function handleEditTask(newTask: Task, listId: string) {
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

    function toggleTaskCompleted(taskId: string, listId: string) {
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


    return (
        <Lists.Provider value={{ user, setUser, lists, setLists, handleAddTask, handleEditTask, toggleTaskCompleted }}>
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
