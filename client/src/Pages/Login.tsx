import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/user/UserSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === false) {
      console.log(data.message);
    } else {
      toast.success(`Welcome ${data.name}`);
      dispatch(addUser(data));
      navigate("/");
    }
  };

  return (
    <main className="max-w-[500px] flex flex-col gap-3 justify-center items-center m-auto mt-14 mb-28">
      <div className="w-full flex justify-center flex-col">
        <h1 className="text-black font-bold text-3xl">Welcome Back!</h1>
        <p className="text-sm tracking-wider">
          {" "}
          Welcome Back! Please enter your details
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-start flex-col gap-6"
      >
        <div className="w-full">
          <p className="text-gray-950">Email</p>
          <input
            type="email"
            className="p-[10px] w-[75%] text-sm rounded border-gray-700 border-[1px]"
            required
            placeholder="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p className="text-gray-950">Password</p>
          <input
            type="password"
            className="p-[10px] w-[75%] text-sm rounded border-gray-700 border-[1px]"
            required
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white font-semibold p-[10px] w-[75%] rounded-md  duration-300 ease-in-out hover:scale-105"
          disabled={false}
        >
          Login
        </button>
      </form>

      <div className="w-full flex flex-col gap-3">
        <p>
          Don't Have an account ?
          <Link to={"/register"} className="font-semibold">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
