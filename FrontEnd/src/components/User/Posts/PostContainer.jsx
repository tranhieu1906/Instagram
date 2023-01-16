import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../../service/postAction";
import {
  DELETE_POST_RESET,
  LIKE_UNLIKE_POST_RESET,
  NEW_COMMENT_RESET,
} from "../../../constants/postConstants";
import PostItem from "./PostItem";

const PostContainer = ({ posts, id }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const {
    error: likeError,
    message,
    success,
  } = useSelector((state) => state.likePost);
  const { error: commentError, success: commentSuccess } = useSelector(
    (state) => state.newComment
  );
  const { error: deleteError, success: deleteSuccess } = useSelector(
    (state) => state.deletePost
  );

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
      toast.success("Comment đã thêm !");
      dispatch({ type: NEW_COMMENT_RESET });
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (deleteSuccess) {
      toast.success("Post đã xóa");
      dispatch({ type: DELETE_POST_RESET });
    }
  }, [
    dispatch,
    success,
    likeError,
    message,
    commentError,
    commentSuccess,
    deleteError,
    deleteSuccess,
    params.username,
  ]);
  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-8 my-1 mb-8" id={id}>
      {posts?.map((post, index) => <PostItem {...post} key={index} />).reverse()}
    </div>
  );
};

export default PostContainer;
