"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import socket from "@/lib/socket";
import { motion, AnimatePresence } from "framer-motion";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("taskAdded", (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    socket.on("taskCompleted", (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id
            ? { ...task, completed: updatedTask.completed }
            : task
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
    if (text.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }

    if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase())) {
      setError("Task with the same name already exists.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false,
      user: username,
    };

    setError(null);
    socket.emit("taskAdded", newTask);
  };

  const handleToggleCompleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed }; // Toggle the completed status
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? updatedTask : t))
    );

    socket.emit("taskCompleted", updatedTask); // Emit the updated task to the server
  };

  const handleDeleteTask = (id: string) => {
    socket.emit("taskDeleted", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Task Collab</h1>
          <p className="text-xl text-gray-600">Welcome, {username}!</p>
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-md"
              role="alert"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <TaskForm onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onCompleteTask={handleToggleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}
