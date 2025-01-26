import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TaskListProps } from '../lib/types'

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <AnimatePresence>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
              task.completed ? "bg-green-50" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onCompleteTask(task.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {task.completed && <CheckIcon className="w-3 h-3 text-white" />}
                </button>
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-500" : "text-gray-700"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{task.user}</span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 ease-in-out"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default TaskList;