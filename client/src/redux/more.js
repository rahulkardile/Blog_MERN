
useEffect(() => {
    const Tododata = async () => {
      const res = await fetch("/api/todos/get");
      const data = await res.json();

      setData(data);
    };
    Tododata();
  }, []);

const handleDelete = async (e) => {
    const res = await fetch(`/api/todos/delete/${e}`, {
        method: "Delete",
    });

    const data = await res.json();
    if (data.success === false) {
        console.log(data.message);
      } else {
        toast.success(`deleted`);
      }

  };

  const handleUpdate = async (e) => {
    const res = await fetch(`/api/todos/update/${e}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status: true}),
    });

    const data = await res.json();
    if (data.success === false) {
        console.log(data.message);
      } else {
        toast.success(`Updated`);

      }

};

