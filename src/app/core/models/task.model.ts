export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  categoryId?: string;
  categoryName?: string;
  priorityName?: string;
}