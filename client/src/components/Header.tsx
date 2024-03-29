import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootStates } from "../redux/store";
import toast from "react-hot-toast";
import { removerUser } from "../redux/user/UserSlice";
import img from "../assets/avatar.webp"

const Header = () => {
  const user = useSelector((state: RootStates) => state).user;
  console.log(user);
  
const dispatch = useDispatch();

  const handleLogout = async() => {
    const res = await fetch("/api/user/logout")
    const data = await res.json();
    
    dispatch(removerUser());
    console.log(data);
    toast.success("logout Successfull")
    
  }

  return (
    <header className="p-4 border-b border-indigo-600 bg-gray-100 flex justify-between items-center">
      <div className="ml-4">
        <Link to={"/"}>
          <h1 className="text-indigo-400 flex gap-1 items-center text-3xl font-semibold duration-300">
             WixBlog
          </h1>
        </Link>
      </div>

      <div className="text-white flex items-center gap-4 text-sm mr-10">
        {user.currentUser?.name ? (
          <>
            {/* <img className="w-8 h-8 rounded-full"  src={img} alt="" /> */}
            <button className="font-semibold duration-200 text-indigo-500 border-[1px] border-indigo-500 p-3 rounded-xl" onClick={handleLogout}>Logout</button>
            <p className="border border-indigo-800 py-3" />
            <Link className="bg-indigo-600 p-3 px-8 rounded-xl text-white font-semibold" to={"/create"}>Create</Link>
          </>
        ) : (
          <>
            <Link
              to={"/register"}
              className="font-semibold duration-200 text-indigo-500 border-[1px] border-indigo-500 p-3 rounded-xl ease-in-out hover:opacity-80 cursor-pointer"
            >
              Register
            </Link>

            <p className="border border-white py-3" />
            <Link to={"/login"} className="bg-indigo-500 p-3 px-8 rounded-xl duration-300 ease-in-out hover:opacity-80 text-white font-semibold">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
