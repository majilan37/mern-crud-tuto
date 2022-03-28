import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import { todosServices } from "../services/todos";
import { RootState } from "../store";

interface InitialState {
  todos: Todo[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  todos: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getTodos = createAsyncThunk<Todo[], void, { state: RootState }>(
  "todos/getTodos",
  async (todos, thunkApi): Promise<Todo[]> => {
    try {
      return await todosServices.getTodos(
        thunkApi.getState().auth.user?.token as string
      );
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const createTodo = createAsyncThunk<
  Todo,
  { text: string },
  { state: RootState }
>("todos/createTodo", async ({ text }, thunkApi) => {
  const token = thunkApi.getState().auth.user?.token;
  try {
    thunkApi.rejectWithValue("Todo created");
    return await todosServices.createTodo(text, token as string);
  } catch (error: any) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const deleteTodo = createAsyncThunk<
  string,
  Todo["_id"],
  { state: RootState }
>("todos/deleteTodo", async (id, thunkApi) => {
  const token = thunkApi.getState().auth.user?.token;
  try {
    return await todosServices.deleteTodo(id, token as string);
  } catch (error: any) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading Todos...";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.todos = action.payload as Todo[];
        state.message = "Todos loaded successfully";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Todo created successfully";
        state.todos.push(action.payload as Todo);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Todo deleted successfully";
        state.todos = state.todos.filter(
          (todo) => todo._id !== (action.payload as string)
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { reset } = todosSlice.actions;
