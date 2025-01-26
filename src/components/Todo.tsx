"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { motion, AnimatePresence } from "framer-motion";
import type { Task } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import {
  setupSocketListeners,
  emitAddTask,
  emitToggleTask,
  emitDeleteTask,
} from "@/lib/SocketService";

export default function Todo() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Anonymous";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setupSocketListeners(setTasks);

    return () => {
      setupSocketListeners(() => {});
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
    emitAddTask(newTask);
  };

  const handleToggleCompleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    emitToggleTask(updatedTask);
  };

  const handleDeleteTask = (id: string) => {
    emitDeleteTask(id);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-extralight tracking-tight mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
                Task<span className="font-medium">Collab</span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Welcome, <span className="font-normal text-blue-600">{username}</span>
            </p>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded-r-md"
                role="alert"
              >
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              onCompleteTask={handleToggleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

