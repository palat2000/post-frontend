import { FormEvent, useContext, useState } from "react";
import ButtonStyled from "./ButtonStyled";
import { MyContext } from "../context/ContextProvider";

function CreatePost() {
  const context = useContext(MyContext);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    await context?.createPost(message);
    setMessage("");
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-400">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          placeholder="คิดอะไรอยู่"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 focus:outline-none resize-none"
        />
        <ButtonStyled type="submit" className="self-end" variant="contained">
          Post
        </ButtonStyled>
      </form>
    </div>
  );
}

export default CreatePost;
