import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LIKE_UNLIKE_POST_RESET,
  NEW_COMMENT_RESET,
} from "../../constants/postConstants";
import { clearErrors, getPostsOfFollowing } from "../../service/postAction";
import UsersDialog from "../Layouts/UsersDialog";
import PostItem from "./PostItem";
import StoriesContainer from "./StoriesContainer";

import InfiniteScroll from "react-infinite-scroll-component";
import { io } from "socket.io-client";
import SkeletonPost from "../Layouts/SkeletonPost";
import SpinLoader from "../Layouts/SpinLoader";
import {
  commentIcon,
  emojiIcon,
  likeIconOutline,
  moreIcons,
  shareIcon,
} from "./SvgIcons";

const PostsContainer = ({ socket }) => {
  const dispatch = useDispatch();

  const [usersList, setUsersList] = useState([]);
  const [usersDialog, setUsersDialog] = useState(false);
  const [page, setPage] = useState(2);

  const { loading, error, posts, totalPosts } = useSelector(
    (state) => state.postOfFollowing
  );
  const {
    error: likeError,
    message,
    success,
  } = useSelector((state) => state.likePost);
  const { error: commentError, success: commentSuccess } = useSelector(
    (state) => state.newComment
  );
  const { user } = useSelector((state) => state.user);

  const handleClose = () => setUsersDialog(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getPostsOfFollowing());
  }, [dispatch, error]);

  useEffect(() => {
    if (likeError) {
      toast.error(likeError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: LIKE_UNLIKE_POST_RESET });
    }
    if (commentError) {
      toast.error(commentError);
      dispatch(clearErrors());
    }
    if (commentSuccess) {
      toast.success("Comment Added");
      dispatch({ type: NEW_COMMENT_RESET });
    }
  }, [dispatch, success, likeError, message, commentError, commentSuccess]);

  const fetchMorePosts = () => {
    setPage((prev) => prev + 1);
    dispatch(getPostsOfFollowing(page));
  };

  // useEffect(() => {
  //   socket?.emit("newUser", user.username);
  // }, [socket, user]);
  return (
    <>
      <div className="flex flex-col w-full lg:w-2/3 sm:mt-6 sm:px-8 mb-8">
        <StoriesContainer />
        {loading &&
          Array(5)
            .fill("")
            .map((el, i) => <SkeletonPost key={i} />)}
        {posts.length !== 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={posts.length !== totalPosts}
            loader={<SpinLoader />}
          >
            <div className="w-full h-full mt-1 sm:mt-6 flex flex-col space-y-4">
              {posts?.map((post, index) => (
                <PostItem
                  key={index}
                  {...post}
                  socket={socket}
                  setUsersDialog={setUsersDialog}
                  setUsersList={setUsersList}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="flex flex-col border rounded bg-white relative">
            <div className="flex justify-between px-3 py-2.5 border-b items-center">
              <div className="flex space-x-3 items-center">
                <img
                  draggable="false"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://static.cdninstagram.com/rsrc.php/v3/yR/r/lam-fZmwmvn.png"
                  alt="avatar"
                />
                <span className="text-black text-sm font-semibold">
                  Instagram
                </span>
              </div>
              <span className="cursor-pointer">{moreIcons}</span>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                alt="description"
                draggable="false"
                loading="lazy"
                className="w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--2fS0sUh8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/8y9m1r90a9moi4ufe6lm.png"
              />
            </div>
          </div>
        )}

        <UsersDialog
          title="Likes"
          open={usersDialog}
          onClose={handleClose}
          usersList={usersList}
        />
      </div>
    </>
  );
};

export default PostsContainer;
