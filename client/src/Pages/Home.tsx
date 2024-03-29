import { useSelector } from "react-redux";
import { RootStates } from "../redux/store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import img from "../assets/img.webp"

const Home = () => {
  const user = useSelector((state: RootStates) => state).user;
  const [data, setData] = useState([
    {
      _id: "",
      title: "",
      cover: "",
      summary: "",
      user: "",
    },
  ]);

  useEffect(() => {
    const db = async () => {
      const res = await fetch("/api/post/get");
      const resData = await res.json();

      if (resData.success === true) {
        setData(resData.data);
        // toast.success("data has been fetched!")
      } else {
        toast.error("Can't fetch data!");
      }
    };

    db();
  }, []);

  return (
    <section>
      {data.length > 0 ? (
        data.map((item, i) => (
          <div
            className="max-w-[1100px] flex justify-center gap-7 items-center flex-row h-[200px] my-5 m-auto"
            key={i}
          >
            <div className="overflow-hidden">
              <Link to={`/blog/${item?._id}`}>
                <img
                  src={
                    `/api/${item.cover}` || img
                  }
                  alt="img"
                  className="object-cover h-48 w-auto"
                />
              </Link>
            </div>
            <div className=" w-[50%] h-[200px] flex justify-start my-3 gap-3 flex-col overflow-hidden">
              <Link to={`/blog/${item?._id}`}>
                <h1 className="text-xl font-semibold">{item?.title}</h1>
              </Link>
              <p className="text-sm line-clamp-4">{item?.summary}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-lg m-auto mx-auto my-auto">Loading . . .</h1>
      )}
    </section>
  );
};

export default Home;
