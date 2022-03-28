import { useState, useEffect } from "react";
import { UserAddIcon } from "@heroicons/react/outline";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { register, reset } from "../redux/slices/auth";
import { UserData } from "../types";
import Spinner from "../components/Spinner";

interface UseFormData extends UserData {
  confirmPassword: string;
}

function Register() {
  const [formData, setFormData] = useState<UseFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(register(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-lg mx-auto py-6 px-2">
      <section>
        <h1 className="text-3xl text-center font-semibold flex items-center space-x-3 justify-center">
          <UserAddIcon className="h-10 m-0" />
          <span className="">Register</span>
        </h1>
        <p className="text-center text-gray-700 font-bold mt-2">
          Please create an account
        </p>
      </section>
      <section className="">
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
              value={formData.name}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="border px-2 py-1 outline-none focus:ring-2 ring-blue-500 transition-all duration-200"
              value={formData.confirmPassword}
              onChange={onChange}
            />
          </div>
          <button className="block bg-black text-white py-2 w-full hover:shadow-md hover:scale-105 transform transition-all duration-200">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
