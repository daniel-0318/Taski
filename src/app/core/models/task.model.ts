export interface Task {
  id: string;
  title: string;
  dueDate?: Date;
  completed: boolean;
  categoryId?: string;
}