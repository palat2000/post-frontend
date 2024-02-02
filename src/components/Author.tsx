import { Size } from "../enum/Size";
import Avatar from "./Avatar";

function Author({
  head,
  bgColor,
}: {
  head: { name: string; dateCreated: Date };
  bgColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 pb-2">
      <Avatar bgColor={bgColor} name={head.name} size={Size.medium} />
      <div className="flex gap-5 items-center">
        <p className="text-gray-800 font-semibold">{head?.name}</p>
        <p className="text-gray-500 text-sm">
          {new Date(head?.dateCreated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default Author;
