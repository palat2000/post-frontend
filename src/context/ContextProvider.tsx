import { ReactElement, createContext, useState, useEffect } from "react";
import axios from "../service/axios";
import ContextModel from "../model/ContextModel";
import UserModel from "../model/UserModel";
import { PostModel, CommentModel } from "../model/PostModel";

export const MyContext = createContext<ContextModel | null>(null);

function ContextProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const deleteComment = async (postId: string, commentId: string) => {
    try {
      await axios.delete(`/api/delete-comment/${postId}/${commentId}`);
      const newPosts = [...posts];
      const index = newPosts.findIndex((post) => post._id === postId);
      newPosts[index].comments = newPosts[index].comments.filter(
        (comment) => comment.id !== commentId
      );
      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async (postId: string) => {
    try {
      await axios.delete(`/api/delete-post/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.log(err);
    }
  };
  const createPost = async (message: string) => {
    try {
      const body = { name: user?.name, message };
      const newPost = await axios.post<PostModel>("/api/create-post", body);
      setPosts([newPost.data, ...posts]);
    } catch (err) {
      console.log(err);
    }
  };
  const createComment = async (message: string, postId: string) => {
    try {
      const body = { name: user?.name, message };
      const newComment = await axios.post<CommentModel>(
        `/api/comment-post/${postId}`,
        body
      );
      const newPosts = [...posts];
      const index = newPosts.findIndex((post) => post._id == postId);
      newPosts[index].comments.push(newComment.data);
      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const posts = await axios.get<PostModel[]>("/api/get-posts");
        setPosts(posts.data);
        console.log(posts.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetch();
    }
  }, [user]);
  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        posts,
        isLoading,
        deleteComment,
        createPost,
        deletePost,
        createComment,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
