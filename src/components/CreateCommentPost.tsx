import { FormEvent, useContext, useState } from "react";
import ButtonStyled from "./ButtonStyled";
import { MyContext } from "../context/ContextProvider";

function CreateCommentPost({ postId }: { postId: string }) {
  const context = useContext(MyContext);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    if (message.trim() === "") return;
    e.preventDefault();
    await context?.createComment(message, postId);
    setMessage("");
  };
  return (
    <div className="p-4 rounded-lg border">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          placeholder="คอมเมนต์..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full focus:outline-none resize-none rounded-lg"
        />
        <ButtonStyled
          type="submit"
          className="self-end"
          sx={{ fontSize: "10px", padding: "3px" }}
          variant="contained"
        >
          Comment
        </ButtonStyled>
      </form>
    </div>
  );
}

export default CreateCommentPost;
