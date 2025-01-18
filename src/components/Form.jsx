import React, { useState } from "react";
import { PostData } from "../api/PostApi";

const Form = ({ data, setData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

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

  //   form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex mt-10 gap-4 p-5 justify-center items-center bg-[#1F2937] rounded-lg"
    >
      <div>
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
      <div>
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
        className="py-2 px-6 bg-green-400 hover:bg-green-500 transition rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
