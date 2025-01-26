import socket from "@/lib/socket";
import { Task } from "@/lib/types";

export const setupSocketListeners = (
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
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
};

export const emitAddTask = (task: Task) => {
  socket.emit("taskAdded", task);
};

export const emitToggleTask = (updatedTask: Task) => {
  socket.emit("taskCompleted", updatedTask);
};

export const emitDeleteTask = (id: string) => {
  socket.emit("taskDeleted", id);
};
