export interface Task {
    id: string;
    text: string;
    completed: boolean;
    user: string;
  }

export interface TaskListProps {
    tasks: Task[];
    onCompleteTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
  }

export interface TaskFormProps {
    onAddTask: (task: string) => void
  }
