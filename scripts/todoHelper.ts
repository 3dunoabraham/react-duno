import { Todo } from "@/pages/api/crud";

export async function updateTodo(todoId: string, newTodoData: Partial<Todo>): Promise<Todo | null> {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodoData)
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo: Todo = await response.json();
      return updatedTodo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  