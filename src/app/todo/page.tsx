"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import socket from "@/lib/socket";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  user: string;
}

export default function TodoPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Anonymous";

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    socket.on("taskAdded", (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    socket.on("taskCompleted", (id: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    });

    socket.on("taskDeleted", (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskCompleted");
      socket.off("taskDeleted");
    };
  }, []);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false,
      user: username, // Include the username
    };
    socket.emit("taskAdded", newTask);
  };

  const handleCompleteTask = (id: string) => {
    socket.emit("taskCompleted", id);
  };

  const handleDeleteTask = (id: string) => {
    socket.emit("taskDeleted", id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
