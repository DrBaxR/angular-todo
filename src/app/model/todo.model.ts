export interface Todo {
  id: number;
  dueDate?: Date;
  title: string;
  description: string;
}

export interface TodoCreate {
  title: string;
  description: string;
}
