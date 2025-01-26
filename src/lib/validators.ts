import { Task } from "@/lib/types";

export const validateTaskInput = (
  text: string,
  tasks: Task[]
): string | null => {
  if (text.trim() === "") return "Task cannot be empty.";
  if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase()))
    return "Task with the same name already exists.";
  return null;
};
