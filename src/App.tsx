import { useContext, useState } from "react";
// import { Pagination } from "@mui/material";
import Header from "./components/Header";
import Login from "./components/Login";
import PostCard from "./components/PostCard";
import Register from "./components/Register";
import { MyContext } from "./context/ContextProvider";
import PostCardLoading from "./components/PostCardLoading";
import CreatePost from "./components/CreatePost";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const context = useContext(MyContext);

  const toggleIsRegister = () => {
    setIsRegister(!isRegister);
  };

  if (!context?.user) {
    if (isRegister) {
      return <Register toggleIsRegister={toggleIsRegister} />;
    }
    return <Login toggleIsRegister={toggleIsRegister} />;
  }

  if (context.user) {
    return (
      <>
        <Header />
        <div className="container min-w-[400px] flex flex-col gap-5 py-10 mx-auto">
          {context.isLoading && (
            <>
              <PostCardLoading />
              <PostCardLoading />
              <PostCardLoading />
            </>
          )}
          <CreatePost />
          {!context.isLoading &&
            context.posts.length > 0 &&
            context.posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          {/* <Pagination
            showFirstButton
            showLastButton
            count={1}
            // page={1}
            defaultPage={1}
            siblingCount={4}
            boundaryCount={0}
            shape="rounded"
            className="mx-auto"
          /> */}
        </div>
      </>
    );
  }
}

export default App;
