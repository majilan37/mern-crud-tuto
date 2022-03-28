import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createTodo, reset } from "../redux/slices/todos";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import TodoItem from "./TodoItem";

function TodoForm() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { todos, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.todos
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createTodo({ text }));
    setText("");
  };

  useEffect(() => {
    if (isSuccess) {
      //   toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, [message, isError, isSuccess]);

  return (
    <section>
      <form onSubmit={onSubmit} action="" className="flex flex-col space-y-2">
        <div className="flex-grow">
          <label htmlFor="todo" className="text-lg font-medium">
            Todo
          </label>
          <input
            className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
            type="text"
            name="todo"
            placeholder="Add Todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="space-y-2 pt-2 ">
            {isLoading ? (
              <p className="text-gray-600 text-center">
                <Spinner />
                Loading...
              </p>
            ) : (
              todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
            )}
          </div>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Add Todo
        </button>
      </form>
    </section>
  );
}

export default TodoForm;
