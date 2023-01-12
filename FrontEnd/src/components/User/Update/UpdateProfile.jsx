import { useState, useRef } from "react";
import MetaData from "../../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navgate = useNavigate();
  const avatarInput = useRef(null);

  const { user } = useSelector((state) => state.user);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [userName, setUserName] = useState(user.username);
  const [oldAvatar] = useState(user.profile_picture);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {};
  const handleAvatarChange = (e) => {
    const reader = new FileReader();
    setAvatar("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };
  return (
    <>
      <MetaData title="Edit Profile • Instagram" />
      <form
        onSubmit={handleUpdate}
        encType="multipart/form-data"
        className="flex flex-col gap-4 py-4 px-4 sm:py-10 sm:px-24 sm:w-3/4"
      >
        <div className="flex items-center gap-8 ml-20">
          <div className="w-11 h-11">
            <img
              draggable="false"
              className="w-full h-full rounded-full border object-cover"
              src={avatarPreview ? avatarPreview : oldAvatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-xl">{userName}</span>
            <label
              onClick={(e) => avatarInput.current.click()}
              className="text-sm font-medium text-primary-blue cursor-pointer"
            >
              Thay đổi ảnh đại diện
            </label>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              ref={avatarInput}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">Tên</span>
          <input
            className="border rounded p-1 w-3/4"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full text-right items-center">
          <p className="w-1/4"></p>
          <p className="w-3/4 text-gray-400 font-thin text-xs pl-6 text-left">
            Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy hơn.
            Đó có thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp. Bạn chỉ có
            thể đổi tên mình 2 lần trong vòng 14 ngày.
          </p>
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">Tên người dùng</span>
          <input
            className="border rounded p-1 w-3/4"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full text-right items-center">
          <p className="w-1/4"></p>
          <p className="w-3/4 text-gray-400 font-thin text-xs pl-6 text-left">
            Thông thường, bạn sẽ có thêm 14 ngày để đổi tên người dùng lại thành{" "}
            {name}
          </p>
        </div>
        <div className="flex w-full gap-8 text-right items-center">
          <span className="w-1/4 font-semibold">Email</span>
          <input
            className="border rounded p-1 w-3/4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={"loading"}
          className="bg-primary-blue font-medium rounded text-white py-2 w-40 mx-auto text-sm"
        >
          Thay đổi
        </button>
      </form>
    </>
  );
};
export default UpdateProfile;
