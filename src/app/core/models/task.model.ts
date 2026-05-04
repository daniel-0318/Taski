export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  categoryId?: string;
  categoryName?: string;
  priorityName?: string;
}