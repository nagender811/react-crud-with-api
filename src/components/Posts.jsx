import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  //   function to delete Post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", Response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
    <section className="w-[400px] md:w-[550px]">
        <Form data={data} setData={setData}/>
    </section>
    <section className="px-20 py-10">
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((currElem) => {
          const { id, body, title } = currElem;
          return (
            <li key={id} className=" p-4 rounded-lg md:p-8 bg-gray-800">
              <p className="mb-2 text-lg text-gray-500">{id}</p>
              <div className="flex flex-col gap-3 min-h-[250px]">
                <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Title: {title}
                </h1>
                <p className="mb-3 text-gray-500 dark:text-gray-400">
                  News: {body}
                </p>
              </div>
              <div className="flex justify-around">
                <button className="px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition">
                  Edit
                </button>
                <button
                  className="px-5 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
    </div>
  );
};

export default Posts;
