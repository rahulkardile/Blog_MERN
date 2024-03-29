import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootStates } from "../redux/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BlogPage = () => {
const navigate = useNavigate();
  const user = useSelector((state: RootStates) => state).user;
  const [data, setData] = useState({
    title: "",
    summary: "",
    content: "",
    user: "",
    cover: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const Tododata = async () => {
      const res = await fetch(`/api/post/get/${id}`);
      const data = await res.json();

      setData(data.data);
    };
    Tododata();
  }, []);

  const handleDelete = async ()=> {
    const res = await fetch(`/api/post/delete/${id}`, {
      method: "DELETE"
    })
    const { success, message } = await res.json();

    if(success === true){
      toast.success(message)

      setTimeout(() => {
        navigate("/")
      }, 2000);

    }else{
      toast.error("Got an problem while deleting!")
    }

  }

  return (
    <section className="w-[1300px] h-full  flex flex-col justify-start gap-4 items-center">
      {data?.title ? (
        <>
          <div className="w-[70%] overflow-hidden flex justify-center items-center flex-col h-[400px] mt-16">
            <h1 className="text-3xl h-[5%] items-cente font-bold mb-4">
              {data?.title}
            </h1>

            <img
              src={`/api/${data?.cover}`}
              className="w-[85%] h-[55vh] m-auto object-contain"
              alt="img"
            />
          </div>
           { 
                user.currentUser?._id === data.user ? (<>
                  <button className="bg-indigo-600 p-3 rounded text-white px-7 duration-300 hover:opacity-75">Edit Post</button>
                  <button onClick={handleDelete} className="bg-indigo-600 p-3 rounded text-white px-7 duration-300 hover:opacity-75">Delete</button>
                </>
                 ) : ("")
            }
          <div className=" w-[65%] m-auto h-[1500px] mb-20" dangerouslySetInnerHTML={{ __html: data.content }} />        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default BlogPage;
