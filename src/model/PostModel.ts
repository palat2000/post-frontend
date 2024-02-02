export interface PostModel {
  comments: CommentModel[];
  dateCreated: Date;
  dateModified: Date;
  message: string;
  name: string;
  __v: string;
  _id: string;
}

export interface CommentModel {
  dateCreated: Date;
  message: string;
  name: string;
  id: string;
}
