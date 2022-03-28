import axios from "axios";
import { Todo } from "../../types";

const API_URL = "/api/todos";

async function getTodos(token: string) {
  const { data } = await axios.get<Todo[]>(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function createTodo(text: string, token: string) {
  const { data } = await axios.post<Todo>(
    `${API_URL}/create`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

async function deleteTodo(id: string, token: string) {
  const { data } = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export const todosServices = {
  getTodos,
  createTodo,
  deleteTodo,
};
