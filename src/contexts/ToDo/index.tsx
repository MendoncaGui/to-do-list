import React, { Children, createContext, useState } from "react";
import { Task } from "../../models/Tasks";

type ToDoContextProviderProps = {
    children: React.ReactNode
}

type ToDoContextProps = {
    taskListState: Task[],
    setTaskListState: React.Dispatch<React.SetStateAction<Task[]>>;
}

const DEFAULT_VALUES = {
    taskListState: [],
    setTaskListState: () => [{}]
}

const ToDoContext = createContext<ToDoContextProps>(DEFAULT_VALUES);

const ToDoContextProvider = ({ children }: ToDoContextProviderProps) => {
    const [taskListState,setTaskListState] = useState<Task[]>([]);
    return (<ToDoContext.Provider value={{
        taskListState,
        setTaskListState
    }}>
        {children}
    </ToDoContext.Provider>);
}

export default ToDoContext;