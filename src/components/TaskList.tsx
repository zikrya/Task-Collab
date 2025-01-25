
import React from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-4 border rounded-md ${
            task.completed ? 'bg-green-100 line-through' : 'bg-white'
          }`}
        >
          <span>{task.text}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onCompleteTask(task.id)}
              className={`px-3 py-1 rounded-md text-white ${
                task.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={task.completed}
            >
              {task.completed ? 'Completed' : 'Complete'}
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
