"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Header from "@/components/Header";
import ErrorBanner from "@/components/ErrorBanner";
import { setupSocketListeners, emitAddTask, emitToggleTask, emitDeleteTask } from "@/lib/socketService";
import { validateTaskInput } from "@/lib/validators";
import { Task } from "@/lib/types";

export default function TodoPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Anonymous";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setupSocketListeners(setTasks);

  }, []);

  const handleAddTask = (text: string) => {
    const validationError = validateTaskInput(text, tasks);
    if (validationError) {
      setError(validationError);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header title="Task Collab" subtitle={`Welcome, ${username}!`} />
        <ErrorBanner message={error} />
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
