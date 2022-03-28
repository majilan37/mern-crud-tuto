import React, { useEffect } from "react";
import { Todo } from "../types";
import { TrashIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTodo, getTodos } from "../redux/slices/todos";
import { toast } from "react-toastify";

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading } = useAppSelector((state) => state.todos);
  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success("Todo deleted successfully");
  //     }
  //   }, [isSuccess]);

  return (
    <div className="bg-gray-50  hover:bg-gray-100 py-1 px-2 cursor-pointer flex justify-between items-center relative overflow-hidden group">
      <div className="">
        <caption className="text-xs text-gray-800 whitespace-nowrap">
          {new Date(todo.createdAt).toLocaleString()}
        </caption>
        <p>{todo.text}</p>
      </div>
      <button
        onClick={() => {
          dispatch(deleteTodo(todo._id));
        }}
        className="bg-red-600 text-white px-4 py-1 absolute -right-20 bottom-0 top-0 group-hover:right-0 transition-all duration-300">
        {isLoading ? "Deleting" : <TrashIcon className="h-6" />}
      </button>
    </div>
  );
}

export default TodoItem;
