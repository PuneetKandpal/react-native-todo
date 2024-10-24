// TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { TaskType } from "@/@types/types";
import { GeneralHelper } from "@/helpers/general.helper";

interface TodoContextType {
  taskList: TaskType[];
  addTask: (title: string, description: string, completed?: boolean) => void;
  updateTask: (id: string, newTitle: string, newDescription: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const dummyTasks: TaskType[] = [
  {
    id: "jsjsjjsjjjss0",
    title: "Buy milk",
    description:
      "Milk is a nutritious dairy product that is rich in calcium, vitamin D, and other nutrients.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "jsjsjjsjjjss1",
    title: "Go to the gym",
    description: "Regular exercise is essential for maintaining good health.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "jsjsjjsjjjss2",
    title: "Learn a new language",
    description:
      "Learning a new language can open up new opportunities and improve cognitive function.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "jsjsjjsjjjss3",
    title: "Read a book",
    description:
      "Reading is a great way to improve cognitive function and expand your knowledge.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "jsjsjjsjjjss4",
    title: "Take a nap",
    description:
      "Getting enough sleep is essential for maintaining good health.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "jsjsjjsjjjss5",
    title: "Eat a healthy breakfast",
    description:
      "Eating a healthy breakfast can provide the energy and nutrients your body needs to function properly.",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [taskList, setTaskList] = useState<TaskType[]>(dummyTasks);

  const addTask = (title: string, description: string, completed = false) => {
    const newTask: TaskType = {
      id: GeneralHelper.generateRandomId(),
      title,
      description,
      completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTaskList((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (id: string, newTitle: string, newDescription: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const toggleTask = (id: string) => {
    GeneralHelper.showToast("Status updated successfully", "success");
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ taskList, addTask, updateTask, toggleTask, deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
