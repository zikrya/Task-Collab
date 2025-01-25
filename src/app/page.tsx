'use client';

import React, { useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
