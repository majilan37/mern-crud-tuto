import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { LogoutIcon, UserAddIcon } from "@heroicons/react/outline";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout, reset } from "../redux/slices/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Header() {
  // typed redux hooks
  const { user, message, isSuccess, isError } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  console.log(user);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }

    if (isError) {
      toast.error(message);
    }
  }, [isError, message, isSuccess]);
  console.log(message);
  const signOut = () => {
    navigate("/login");
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <header className="p-5 flex justify-between border-b">
      <div className="">
        <Link to="/">Todos Setter</Link>
      </div>
      <ul className="flex items-center space-x-6 flex-grow justify-center">
        {user ? (
          <li>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 active:bg-red-700 px-4 py-2 text-white">
              <LogoutIcon className="h-6" /> <span className="">Logout</span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link className="flex items-center space-x-2" to="/login">
                <LogoutIcon className="h-6" /> <span className="">Login</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-2" to="/register">
                <UserAddIcon className="h-6" />{" "}
                <span className="">Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
