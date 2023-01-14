import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "../../api/axios";
import { addComment, likePost } from "../../service/postAction";
import { likeFill } from "../NavBar/SvgIcons";
import {
  commentIcon,
  emojiIcon,
  likeIconOutline,
  moreIcons,
  shareIcon,
} from "./SvgIcons";
moment.locale("vi");

const PostItem = ({
  id,
  content,
  likes,
  comments,
  image_url,
  postedBy,
  created_at,
  setUsersDialog,
  setUsersList,
}) => {
  const dispatch = useDispatch();
  const commentInput = useRef(null);

  const [allLikes, setAllLikes] = useState(likes);
  const [allComments, setAllComments] = useState(comments);

  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [viewComment, setViewComment] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const [likeEffect, setLikeEffect] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(id));
    const { data } = await axios.get(
      `/api/v1/post/detail/${id}`
    );
    setAllLikes(data.post.likes);
  };
  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(addComment(id, comment));
    setComment("");
    const { data } = await axios.get(
      `/api/v1/post/detail/${id}`
    );
    setAllComments(data.post.comments);
  };

  const handleLikeModal = () => {
    setUsersDialog(true);
    setUsersList(allLikes);
  };

  const setLike = () => {
    setLikeEffect(true);
    setTimeout(() => {
      setLikeEffect(false);
    }, 500);
    if (liked) {
      return;
    }
    handleLike();
  };
  useEffect(() => {
    
  }, []);
  return (
    <div className="flex flex-col border rounded bg-white relative">
      <div className="flex justify-between px-3 py-2.5 border-b items-center">
        <div className="flex space-x-3 items-center">
          <Link to={`/${postedBy.username}`}>
            <img
              draggable="false"
              className="w-10 h-10 rounded-full object-cover"
              src={postedBy.profile_picture}
              alt="avatar"
            />
          </Link>
          <Link
            to={`/${postedBy.username}`}
            className="text-black text-sm font-semibold"
          >
            {postedBy.username}
          </Link>
        </div>
        <span className="cursor-pointer">{moreIcons}</span>
      </div>

      <div
        className="relative flex items-center justify-center"
        onDoubleClick={setLike}
      >
        <img
          alt="description"
          draggable="false"
          loading="lazy"
          className="w-full h-full object-cover object-center"
          src={image_url}
        />
        {likeEffect && (
          <img
            draggable="false"
            height="80px"
            className="likeEffect"
            alt="heart"
            src="https://img.icons8.com/ios-filled/2x/ffffff/like.png"
          />
        )}
      </div>

      <div className="flex flex-col px-4 space-y-1 border-b pb-2 mt-2">
        <div className="flex items-center justify-between py-2">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              {liked ? likeFill : likeIconOutline}
            </button>
            <button onClick={() => commentInput.current.focus()}>
              {commentIcon}
            </button>
            {shareIcon}
          </div>
        </div>

        <span
          onClick={handleLikeModal}
          className="font-semibold text-sm cursor-pointer"
        >
          {allLikes.length} likes
        </span>

        <div className="flex flex-auto items-center space-x-1">
          <Link
            to={`/${postedBy.username}`}
            className="text-sm font-semibold hover:underline"
          >
            {postedBy.username}
          </Link>
          <span className="text-sm truncate">{content}</span>
        </div>

        {allComments.length > 0 ? (
          <span
            onClick={() => setViewComment(!viewComment)}
            className="text-[13px] text-gray-500 cursor-pointer"
          >
            {viewComment
              ? "Hide Comments"
              : allComments.length === 1
              ? `Hiện thị ${allComments.length} bình luân`
              : `Hiển thị tất cả ${allComments.length} bình luận`}
          </span>
        ) : (
          <span className="text-[13px] text-gray-500">No Comments Yet!</span>
        )}
        <span className="text-xs text-gray-500 cursor-pointer">
          {moment(created_at).fromNow()}
        </span>

        {viewComment && (
          <ScrollToBottom className="w-full h-52 overflow-y-auto py-1">
            {allComments.map((c, index) => (
              <div className="flex items-start mb-2 space-x-2" key={index}>
                <img
                  draggable="false"
                  className="h-7 w-7 rounded-full object-cover mr-0.5"
                  src={c.user.profile_picture}
                  alt="avatar"
                />
                <Link
                  to={`/${c.user}`}
                  className="text-sm font-semibold hover:underline"
                >
                  {c.user.username}
                </Link>
                <p className="text-sm">{c.comment}</p>
              </div>
            ))}
          </ScrollToBottom>
        )}
      </div>

      <form
        onSubmit={handleComment}
        className="flex items-center justify-between p-3 w-full space-x-3"
      >
        <span
          onClick={() => setShowEmojis(!showEmojis)}
          className="cursor-pointer"
        >
          {emojiIcon}
        </span>

        {showEmojis && (
          <div className="absolute bottom-12 -left-2">
            <Picker
              theme="light"
              skin="3"
              data={data}
              onSelect={(e) => setComment(comment + e.native)}
              title="Emojis"
            />
          </div>
        )}

        <input
          className="flex-auto text-sm outline-none border-none bg-transparent"
          type="text"
          value={comment}
          ref={commentInput}
          required
          onFocus={() => setShowEmojis(false)}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Thêm bình luận..."
        />
        <button
          type="submit"
          className={`${
            comment.trim().length < 1 ? "text-blue-300" : "text-primary-blue"
          } text-sm font-semibold`}
          disabled={comment.trim().length < 1}
        >
          Đăng
        </button>
      </form>
    </div>
  );
};

export default PostItem;
