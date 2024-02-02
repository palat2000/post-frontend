import { Skeleton } from "@mui/material";

function PostCardLoading() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-400">
      <div className="flex items-center gap-4">
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
        <Skeleton animation="wave" width="30%" height={32} />
        <Skeleton animation="wave" width="20%" height={32} />
      </div>
      <div className="my-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="mb-4"></div>
      <div className="flex items-center justify-end text-gray-500">
        <Skeleton animation="wave" width="10%" />
      </div>
    </div>
  );
}

export default PostCardLoading;
