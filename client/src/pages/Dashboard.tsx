import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getTodos, reset } from "../redux/slices/todos";
import TodoForm from "../components/TodoForm";

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  useEffect((): any => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTodos());
    }

    return dispatch(reset());
  }, [navigate, user, dispatch]);
  console.log(todos);

  return (
    <div className="max-w-lg mx-auto px-3">
      <section className="text-center space-y-2 py-10">
        <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
        <p className="text-xl font-bold text-gray-600">Goals dashboard</p>
      </section>
      <TodoForm />
    </div>
  );
}

export default Dashboard;
