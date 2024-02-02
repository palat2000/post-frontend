import Avatar from "./Avatar";
import { Size } from "../enum/Size";
import { useContext } from "react";
import { MyContext } from "../context/ContextProvider";

function Header() {
  const context = useContext(MyContext);
  const name = context?.user?.name || "";
  return (
    <header className="flex justify-end px-5 py-3 border border-l-0 border-r-0 border-t-0 border-b-gray-300">
      <Avatar
        name={name}
        bgColor={context?.user?.backgroundColor}
        size={Size.large}
      />
    </header>
  );
}

export default Header;
