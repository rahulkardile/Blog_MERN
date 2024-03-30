import { FormEventHandler, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }],
    // ['link', 'image'],                  // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const createNewpost: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if(file !== undefined){
      data.set("cover", file[0]);
    }

    const response = await fetch("/api/post/new", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <section className="flex flex-col gap-7 items-center mt-6">
      <h1 className="text-2xl font-semibold">Create New Post</h1>
      <form
        onSubmit={createNewpost}
        className="w-[650px] m-auto flex flex-col p-3 border rounded py-9 gap-4"
      >
        <input
          className="p-4 border border-black rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-4 border h-32 border-black rounded"
          placeholder="Summary"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
        />

        <input
          type="file"
          className="p-4 border border-black rounded"
          onChange={(e) => setFile(e.target.files)}
        />

        <ReactQuill
          modules={modules}
          value={content}
          className="rounded mb-20 h-72"
          onChange={(newValue) => setContent(newValue)}
        />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded"
          style={{ marginTop: "10px" }}
        >
          Create Post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
