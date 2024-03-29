import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/todos/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === false) {
      console.log(data.message);
    } else {
      toast.success(`Welcome ${data.name}`);
      setFormData({});
    }
  };

  console.log(formData);

  return (
    <section className="text-gray-600 m-auto mt-3">
      <div className="flex flex-col text-center w-full mb-3">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Add The Task
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 flex flex-wrap md:w-2/3 mx-auto max-w-[1000px]"
      >
        <div className="flex flex-row m-auto">
          <div className="p-2 w-1/2 flex flex-col">
            <span className="leading-7 text-sm text-gray-600">Title</span>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              className="w-full px-6 bg-gray-100 p-2 bg-opacity-50 border rounded "
            />
          </div>
          <div className="p-2 w-1/2 flex flex-col">
            <span className="leading-7 text-sm text-gray-600">Date</span>
            <input
              type="date"
              id="date"
              onChange={handleChange}
              className="w-full bg-gray-100 px-6 p-2 bg-opacity-50 border rounded"
            />
          </div>
        </div>

        <div className="p-2 w-full flex flex-col">
          <span className="leading-7 text-sm text-gray-600">Description</span>
          <input
            id="description"
            onChange={handleChange}
            className="w-full bg-gray-100 bg-opacity-50 px-6 rounded border h-11 text-base text-gray-700 py-1"
          />
        </div>
        <div className="p-2 w-full">
          <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
      </form>
    </section>
  );
};

export default Home;
