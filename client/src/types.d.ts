export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface Todo {
  _id: string;
  user: string;
  createdAt: string;
  text: string;
  updatedAt: string;
}
