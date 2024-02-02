import { Size } from "../enum/Size";
import getRandomColor from "../service/randomColor";

const color = getRandomColor();

function Avatar({
  name,
  bgColor,
  size,
}: {
  size: Size;
  name: string;
  bgColor?: string;
}) {
  const sizeAvatar = ["h-5 w-5", "h-8 w-8", "h-10 w-10"];
  const nameShow = name?.length > 4 ? name.slice(0, 3) : name;
  return (
    <div
      className={`rounded-full text-[8px] text-white flex justify-center items-center ${sizeAvatar[size]}`}
      style={{ backgroundColor: bgColor || color }}
    >
      {nameShow}
    </div>
  );
}

export default Avatar;
