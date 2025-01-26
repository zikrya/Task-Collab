import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { TaskListProps } from "../lib/types"

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <AnimatePresence>
      <ul className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`py-4 px-4 sm:px-6 transition-all duration-200 ease-in-out ${
              task.completed ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onCompleteTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in-out mr-3 ${
                  task.completed ? "bg-blue-500 border-blue-500" : "border-gray-300 hover:border-blue-500"
                }`}
              >
                {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
              </motion.button>
              <div className="flex-1 min-w-0">
                <motion.span
                  layout
                  className={`text-base sm:text-lg font-medium block truncate ${
                    task.completed ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {task.text}
                </motion.span>
                <span className="text-xs text-gray-400 mt-1">{task.user}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDeleteTask(task.id)}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  )
}

export default TaskList
