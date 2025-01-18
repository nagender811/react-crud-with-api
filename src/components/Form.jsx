import React, { useEffect, useState } from "react";
import { PostData, updateData } from "../api/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // get the updated Data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const isEmpty = Object.keys(updateDataApi).length === 0;

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await PostData(addData);
    console.log("res", res);

    if ((res.status = 201)) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action == "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col sm:flex-row mt-10 gap-4 p-5 justify-center items-center bg-[#1F2937] rounded-lg"
    >
      <div className="w-full">
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          className="w-full p-2 rounded text-black outline-none border border-gray-500"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full">
        <label htmlFor="news"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          className="w-full p-2 rounded text-black outline-none border border-gray-500"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="w-full sm:w-20 py-2 px-6 bg-green-400 hover:bg-green-500 transition rounded"
        type="submit"
        value={isEmpty ? "Add" : "Edit"}
      >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
