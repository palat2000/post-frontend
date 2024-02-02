import { Dispatch, SetStateAction } from "react";
import UserModel from "./UserModel";
import { PostModel } from "./PostModel";

interface ContextModel {
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
  posts: PostModel[];
  isLoading: boolean;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  createPost: (message: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  createComment: (message: string, postId: string) => Promise<void>;
}

export default ContextModel;
