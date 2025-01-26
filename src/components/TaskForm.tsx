"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { PlusIcon } from "@heroicons/react/24/solid"

interface TaskFormProps {
  onAddTask: (task: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (task.trim() !== "") {
      onAddTask(task.trim())
      setTask("")
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 border-b border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task"
          className="flex-grow p-3 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400 text-lg"
        />
        <button
          type="submit"
          className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </motion.form>
  )
}

export default TaskForm