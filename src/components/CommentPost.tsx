import { useContext, useState } from "react";
import Author from "./Author";
import Bin from "./Bin";
import { CommentModel } from "../model/PostModel";
import { MyContext } from "../context/ContextProvider";

function CommentPost({
  comment,
  onClick,
}: {
  comment: CommentModel;
  onClick: () => void;
}) {
  const context = useContext(MyContext);
  const [onHover, setOnHover] = useState(false);
  const toggle = () => setOnHover(!onHover);
  return (
    <div
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      className="flex justify-between items-center gap-2"
    >
      <div className="flex flex-col gap-2">
        <Author
          head={{ name: comment?.name, dateCreated: comment?.dateCreated }}
        />
        <p className="text-gray-500 text-sm">{comment?.message}</p>
      </div>
      {context?.user?.name == comment.name && (
        <Bin
          onClick={onClick}
          className={`${onHover ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default CommentPost;
